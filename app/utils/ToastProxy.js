import React, {Component} from 'react';
import Toast from 'react-native-root-toast'

export default function toast(text, duration = Toast.durations.SHORT, position = Toast.positions.BOTTOM) {
    return Toast.show(text, {
        duration: duration,
        position: position,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
}

export function hideToast(toast) {
    Toast.hide(toast)
}