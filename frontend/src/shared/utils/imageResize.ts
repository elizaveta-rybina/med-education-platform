export type ResizeOptions = {
	maxWidth?: number
	maxHeight?: number
	quality?: number // 0..1, применяется для JPEG/WEBP
}

type ResizeResult = {
	file: File
	originalWidth: number
	originalHeight: number
	width: number
	height: number
	resized: boolean
}

function readFileAsDataURL(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => resolve(String(reader.result))
		reader.onerror = reject
		reader.readAsDataURL(file)
	})
}

function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.onload = () => resolve(img)
		img.onerror = reject
		img.src = src
	})
}

function fitSize(
	width: number,
	height: number,
	maxWidth: number,
	maxHeight: number
): { width: number; height: number; scale: number } {
	const scaleW = maxWidth > 0 ? maxWidth / width : 1
	const scaleH = maxHeight > 0 ? maxHeight / height : 1
	const scale = Math.min(scaleW, scaleH, 1)
	return {
		width: Math.round(width * scale),
		height: Math.round(height * scale),
		scale
	}
}

export async function resizeImage(
	file: File,
	options: ResizeOptions = {}
): Promise<ResizeResult> {
	const { maxWidth = 600, maxHeight = 600, quality = 0.85 } = options

	const dataUrl = await readFileAsDataURL(file)
	const img = await loadImage(dataUrl)
	const originalWidth = img.naturalWidth || img.width
	const originalHeight = img.naturalHeight || img.height

	const { width, height, scale } = fitSize(
		originalWidth,
		originalHeight,
		maxWidth,
		maxHeight
	)

	// Если не превышает лимиты — возвращаем оригинальный файл
	if (scale === 1) {
		return {
			file,
			originalWidth,
			originalHeight,
			width: originalWidth,
			height: originalHeight,
			resized: false
		}
	}

	const canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height
	const ctx = canvas.getContext('2d')!
	ctx.drawImage(img, 0, 0, width, height)

	const mimeType =
		file.type && file.type.startsWith('image/') ? file.type : 'image/jpeg'

	const blob: Blob = await new Promise((resolve, reject) => {
		// quality учитывается браузером для jpeg/webp
		canvas.toBlob(
			b => (b ? resolve(b) : reject(new Error('toBlob failed'))),
			mimeType,
			quality
		)
	})

	const resizedFile = new File([blob], file.name, {
		type: mimeType,
		lastModified: file.lastModified
	})

	return {
		file: resizedFile,
		originalWidth,
		originalHeight,
		width,
		height,
		resized: true
	}
}

export async function getImageDimensions(
	file: File
): Promise<{ width: number; height: number }> {
	const dataUrl = await readFileAsDataURL(file)
	const img = await loadImage(dataUrl)
	return {
		width: img.naturalWidth || img.width,
		height: img.naturalHeight || img.height
	}
}
