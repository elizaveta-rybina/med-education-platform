/**
 * Zod Validation Schemas for Authentication API
 *
 * Runtime validation for all authentication requests and responses.
 * This ensures type safety at runtime and catches API contract violations early.
 *
 * Benefits:
 * - Catches breaking API changes immediately
 * - Provides runtime type narrowing
 * - Better error messages for API contract violations
 * - TypeScript inference from schemas
 *
 * @module auth.validation
 */

import { z } from 'zod'

/**
 * Custom error class for API validation errors
 * Provides structured error information with field-level details
 */
export class ApiValidationError extends Error {
	constructor(
		message: string,
		public readonly errors?: Record<string, string[]>
	) {
		super(message)
		this.name = 'ApiValidationError'
	}
}

/**
 * Email validation (RFC 5322 simplified)
 */
const emailSchema = z.string().email('Invalid email format').min(5)

/**
 * Password validation (minimum 8 chars, must include upper, lower, number)
 */
const passwordSchema = z
	.string()
	.min(8, 'Password must be at least 8 characters')
	.regex(/[A-Z]/, 'Password must contain uppercase letter')
	.regex(/[a-z]/, 'Password must contain lowercase letter')
	.regex(/\d/, 'Password must contain number')

/**
 * ISO 8601 date format (YYYY-MM-DD)
 */
const isoDateSchema = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')

/**
 * JWT token format (basic validation)
 */
const jwtSchema = z
	.string()
	.regex(
		/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,
		'Invalid JWT token format'
	)

/**
 * Registration request validation
 */
export const registerRequestSchema = z
	.object({
		username: z.string().min(3).max(20),
		email: emailSchema,
		password: passwordSchema,
		password_confirmation: z.string(),
		birth_date: isoDateSchema,
		last_name: z.string().min(1),
		first_name: z.string().min(1),
		middle_name: z.string().optional(),
		university_id: z.number().positive(),
		faculty: z.string().min(1),
		specialization: z.string().min(1),
		course: z.number().min(1).max(6),
		group: z.string().min(1)
	})
	.strict()
	.refine(data => data.password === data.password_confirmation, {
		message: 'Passwords do not match',
		path: ['password_confirmation']
	})

/**
 * Login request validation
 */
export const loginRequestSchema = z
	.object({
		email: emailSchema,
		password: z.string().min(1, 'Password is required')
	})
	.strict()

/**
 * Login response validation
 * Server may not always provide token_type and expires_in
 */
export const loginResponseSchema = z
	.object({
		token: jwtSchema,
		token_type: z.string().optional(),
		expires_in: z.number().positive().optional()
	})
	.strict()

/**
 * User object validation
 */
export const userSchema = z
	.object({
		id: z.number(),
		username: z.string(),
		email: emailSchema,
		first_name: z.string(),
		last_name: z.string(),
		middle_name: z.string().optional(),
		birth_date: isoDateSchema,
		university_id: z.number(),
		faculty: z.string(),
		specialization: z.string(),
		course: z.number(),
		group: z.string(),
		roles: z.array(z.string()).optional(),
		created_at: z.string().datetime(),
		updated_at: z.string().datetime()
	})
	.strict()

/**
 * Registration response validation
 */
export const registerResponseSchema = z
	.object({
		message: z.string(),
		user: userSchema.optional(),
		token: jwtSchema.optional(),
		token_type: z.string().optional(),
		expires_in: z.number().optional()
	})
	.strict()

/**
 * Me response validation
 */
export const meResponseSchema = z
	.object({
		user: userSchema
	})
	.strict()

/**
 * Logout response validation
 */
export const logoutResponseSchema = z
	.object({
		message: z.string()
	})
	.strict()

/**
 * Type inference from Zod schemas
 */
export type RegisterRequest = z.infer<typeof registerRequestSchema>
export type LoginRequest = z.infer<typeof loginRequestSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
export type User = z.infer<typeof userSchema>
export type RegisterResponse = z.infer<typeof registerResponseSchema>
export type MeResponse = z.infer<typeof meResponseSchema>
export type LogoutResponse = z.infer<typeof logoutResponseSchema>

/**
 * Generic validation function for request data
 * Validates input before sending to API
 *
 * @template T - Expected validated type
 * @param {unknown} data - Raw data to validate
 * @param {z.ZodSchema<T>} schema - Zod schema to validate against
 * @returns {T} Validated and parsed data
 * @throws {ApiValidationError} If validation fails with field-level errors
 *
 * @example
 * const validatedLogin = validateRequest(userInput, loginRequestSchema)
 * // validatedLogin is typed as LoginRequest
 */
export const validateRequest = <T>(
	data: unknown,
	schema: z.ZodSchema<T>
): T => {
	try {
		return schema.parse(data)
	} catch (error) {
		if (error instanceof z.ZodError) {
			const fieldErrors: Record<string, string[]> = {}
			error.issues.forEach((err: z.ZodIssue) => {
				const path = err.path.join('.')
				if (!fieldErrors[path]) {
					fieldErrors[path] = []
				}
				fieldErrors[path].push(err.message)
			})
			throw new ApiValidationError('Validation failed', fieldErrors)
		}
		throw error
	}
}

/**
 * Validates and parses API response
 * Throws error if response doesn't match expected schema
 *
 * @template T - Expected response type
 * @param {unknown} data - Raw response data to validate
 * @param {z.ZodSchema<T>} schema - Zod schema to validate against
 * @returns {T} Validated and parsed data
 * @throws {z.ZodError} If validation fails with detailed error information
 *
 * @example
 * const user = parseApiResponse(response.data, userSchema)
 */
export const parseApiResponse = <T>(
	data: unknown,
	schema: z.ZodSchema<T>
): T => {
	return schema.parse(data)
}

/**
 * Safely validates response, returning null if invalid
 * Logs validation errors for debugging (non-throwing)
 *
 * @template T - Expected response type
 * @param {unknown} data - Raw response data to validate
 * @param {z.ZodSchema<T>} schema - Zod schema to validate against
 * @returns {T | null} Validated data or null if validation failed
 *
 * @example
 * const user = parseApiResponseSafe(response.data, userSchema)
 * if (user) {
 *   // user is typed as User
 * }
 */
export const parseApiResponseSafe = <T>(
	data: unknown,
	schema: z.ZodSchema<T>
): T | null => {
	const result = schema.safeParse(data)
	if (!result.success) {
		console.error('[API Validation Error]', {
			errors: result.error.flatten(),
			data
		})
		return null
	}
	return result.data
}
