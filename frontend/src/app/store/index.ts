import authReducer from '@/app/store/auth/slice'
import coursesReducer from '@/app/store/courses/slice'
import lecturesReducer from '@/app/store/lectures/slice'
import modulesReducer from '@/app/store/modules/slice'
import testReducer from '@/app/store/test/slice'
import topicsReducer from '@/app/store/topics/slice'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'auth',
	storage,
	whitelist: ['user', 'authToken', 'rememberedEmail']
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
	reducer: {
		test: testReducer,
		auth: persistedAuthReducer,
		courses: coursesReducer,
		modules: modulesReducer,
		topics: topicsReducer,
		lectures: lecturesReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
			}
		})
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
