import { PlaylistItem } from "@/app/types/playlist";
import { VideoEntity } from "@/app/types/videos";
import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: 'dataSlice',
    initialState: {
        id: '',
        title: '',
        description: '',
        tags: ['',],
        thumbnail: '',
        validation: '',
    },
    reducers: {
        setDataFromVideo: (state, action: PayloadAction<{ video: VideoEntity, tags: string[] }>) => {
            state.id = action.payload.video.id;
            state.title = action.payload.video.snippet.title;
            state.description = action.payload.video.snippet.description;
            state.tags = action.payload.tags;
            state.thumbnail = action.payload.video.snippet.thumbnails.maxres.url;
        },
        setDataFromPlaylist: (state, action: PayloadAction<{ playlist: PlaylistItem, tags: string[] }>) => {
            state.id = action.payload.playlist.id;
            state.title = action.payload.playlist.snippet.title;
            state.description = action.payload.playlist.snippet.description;
            state.tags = action.payload.tags;
            state.thumbnail = action.payload.playlist.snippet.thumbnails.maxres.url
        },
        setValidation: (state, action: PayloadAction<string>) => {
            state.validation = action.payload
        },
    }
})

export const { setDataFromVideo, setDataFromPlaylist, setValidation } = dataSlice.actions
// export const useDispatch = state => state.
export default dataSlice.reducer