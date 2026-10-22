import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector
} from 'react-redux';
import {
    WeatherDispatch,
    WeatherRootState
} from './store';

export const useAppDispatch = () => useDispatch<WeatherDispatch>();

export const useAppSelector: TypedUseSelectorHook<WeatherRootState> = useSelector;