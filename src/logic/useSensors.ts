import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export const useShakeSensor = (onShake: () => void) => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    let subscription: any;
    if (active) {
      Accelerometer.setUpdateInterval(100);
      subscription = Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
        const totalForce = Math.abs(accelerometerData.x) + Math.abs(accelerometerData.y) + Math.abs(accelerometerData.z);
        if (totalForce > 4) { 
            onShake();
        }
      });
    } else {
      subscription?.remove();
    }
    return () => subscription?.remove();
  }, [active]);

  return { data, active, toggleSensor: () => setActive(!active) };
};