import Marker from '../drawables/marker.svg';
import MarkerOrange from '../drawables/marker-orange.svg';
import MarkerRed from '../drawables/marker-red.svg';

export default function getMarker(full) {
    if (full > 75) {
        return MarkerRed;
    } else if (full > 50) {
        return MarkerOrange;
    }
    return Marker;
}