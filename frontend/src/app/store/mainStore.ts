import authReducer from '@/app/store/auth/slice'
import coursesReducer from '@/app/store/courses/slice'
import lecturesReducer from '@/app/store/lectures/slice'
import modulesReducer from '@/app/store/modules/slice'
import topicsReducer from '@/app/store/topics/slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		courses: coursesReducer,
		modules: modulesReducer,
		topics: topicsReducer,
		lectures: lecturesReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
