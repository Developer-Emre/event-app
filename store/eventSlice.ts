import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { Event, EventFilters } from '@/types/event'
import * as eventService from '@/services/eventService'

interface EventState {
  items: Event[]
  selected: Event | null
  isLoading: boolean
  error: string | null
}

const initialState: EventState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
}

export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (
    params: { filters?: EventFilters; signal?: AbortSignal },
    { rejectWithValue }
  ) => {
    try {
      return await eventService.getEvents(params.filters, params.signal)
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw err
      }
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Failed to load events')
    }
  }
)

export const fetchEventBySlug = createAsyncThunk(
  'events/fetchBySlug',
  async (
    params: { slug: string; signal?: AbortSignal },
    { rejectWithValue }
  ) => {
    try {
      return await eventService.getEventBySlug(params.slug, params.signal)
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw err
      }
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Failed to load event')
    }
  }
)

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchEventBySlug.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchEventBySlug.fulfilled, (state, action: PayloadAction<Event>) => {
        state.isLoading = false
        state.selected = action.payload
      })
      .addCase(fetchEventBySlug.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearSelected, clearError } = eventSlice.actions
export default eventSlice.reducer
