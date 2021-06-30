import {useEffect, useState, useRef} from 'react';

export const useMouseScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef(null);


  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const handleScroll = (event) => {
      const {target} = event;
      setScrollY((target).scrollTop);
    };
    const node = ref && ref.current;

    if (node) {
      node.addEventListener('scroll', handleScroll);
      return () => {
        node.removeEventListener('scroll', handleScroll);
      };
    }
  }, [ref]);

  return [ref, scrollY];
};
