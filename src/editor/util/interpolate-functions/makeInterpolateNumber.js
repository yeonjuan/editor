import { Length } from "../../unit/Length";

function getRealAttributeValue (layer, property, value, refType = 'width') {
    switch(refType) {
    case 'width':
        return value.toPx(layer.parent.width.value)
    case 'height':     
        return value.toPx(layer.parent.height.value)
    }

    return value; 
}

export function makeInterpolateNumber(layer, property, startNumber, endNumber, refType = 'width') {
    var s = Length.parse(startNumber);
    var e = Length.parse(endNumber);

    return (rate, t) => {
        var realStartValue = getRealAttributeValue(layer, property, s, refType);
        var realEndValue = getRealAttributeValue(layer, property, e, refType);

        if (t === 0) {
            return realStartValue;
        } else if (t === 1) {
            return realEndValue;
        }


        return new Length(realStartValue.value + (realEndValue.value - realStartValue.value) * rate, realStartValue.unit);
    }
}