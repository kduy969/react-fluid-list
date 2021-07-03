import React, {useRef, useEffect, useCallback} from "react";
import css from './PanView.module.css';
import {useAutoZoomPan} from "../hooks/useAutoZoomPan";
import {useCallbackRef} from "use-callback-ref";


export default ({children, className}) => {
  const panRef = useRef(null);
  const {setUpMouseZoom, setUpMouseDrag} = useAutoZoomPan(panRef, {throttle: 30});
  const trackRef = useCallbackRef(null, function (ref) {
    setUpMouseDrag(ref);
    setUpMouseZoom(ref);
  });

  return <div
    ref={trackRef}
    className={css.container + ' ' + className || ''}
  >
    <div
      ref={panRef}
      className={css.panSection}>
      {children}
    </div>
  </div>
};

