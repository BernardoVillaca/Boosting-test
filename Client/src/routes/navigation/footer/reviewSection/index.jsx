import React, { useRef, useState, useEffect } from 'react';
import ReviewCard from './reviewCard';

const reviews = [
    {
        name: 'marina',
        review: 'sdfsdf dghfgfd g qwewer  sfdsdf  dfg dgf sa das das wqer  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'pedro',
        review: 'sdfsdfsdsdf shfghgfhfg fghjkghwqq eqw eqwewrert etr sfdsdf sdf',
        stars: 4

    },
    {
        name: 'bruno',
        review: 'sdfsdf dghfgf',
        stars: 3

    },
    {
        name: 'john',
        review: 'sdfsdf dghfgfd g qasdasdasdasdsddas das wqer  qw qw eqw eqw',
        stars: 4

    },
    {
        name: 'peter',
        review: 'sdfsdgfffffffwer  sfdsdf  dfg dgf sa das das wqefhgfghfghfgeqw eqw',
        stars: 5

    },
    {
        name: 'mary',
        review: 'sdfsdf dghfgfd g qwefghfghfghfghfghr  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'jason',
        review: 'fghfghfghfsfdsfdfdssdffds  qw qw eqw eqwgdf dgfgdffffffd fgdfgffff df gdf gfffffddfg dfg dfg',
        stars: 3

    },
    {
        name: 'mathias',
        review: 'dfgdggggggggggggggggggggggg dfgdfg dgdfdfgdfdfg dfgdfgdghfgffghfghfghfghfghfhfsa fghfghfgqer  qw qhfghfghfghfghfghgfh eqw eqw',
        stars: 2

    },
    {
        name: 'marina',
        review: 'sdfsdf dghfgfd g qwewer  sfdsdf  dfg dgf sa das das wqer  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'pedro',
        review: 'sdfsdfsdsdf shfghgfhfg fghjkghwqq eqw eqwewrert etr sfdsdf sdf',
        stars: 4

    },
    {
        name: 'bruno',
        review: 'sdfsdf dghfgf',
        stars: 3

    },
    {
        name: 'john',
        review: 'sdfsdf dghfgfd g qasdasdasdasdsddas das wqer  qw qw eqw eqw',
        stars: 4

    },
    {
        name: 'peter',
        review: 'sdfsdgfffffffwer  sfdsdf  dfg dgf sa das das wqefhgfghfghfgeqw eqw',
        stars: 5

    },
    {
        name: 'mary',
        review: 'sdfsdf dghfgfd g qwefghfghfghfghfghr  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'jason',
        review: 'fghfghfghfsfdsfdfdssdffds  qw qw eqw eqwgdf dgfgdffffffd fgdfgffff df gdf gfffffddfg dfg dfg',
        stars: 3

    },
    {
        name: 'mathias',
        review: 'dfgdggggggggggggggggggggggg dfgdfg dgdfdfgdfdfg dfgdfgdghfgffghfghfghfghfghfhfsa fghfghfgqer  qw qhfghfghfghfghfghgfh eqw eqw',
        stars: 2

    },
    {
        name: 'marina',
        review: 'sdfsdf dghfgfd g qwewer  sfdsdf  dfg dgf sa das das wqer  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'pedro',
        review: 'sdfsdfsdsdf shfghgfhfg fghjkghwqq eqw eqwewrert etr sfdsdf sdf',
        stars: 4

    },
    {
        name: 'bruno',
        review: 'sdfsdf dghfgf',
        stars: 3

    },
    {
        name: 'john',
        review: 'sdfsdf dghfgfd g qasdasdasdasdsddas das wqer  qw qw eqw eqw',
        stars: 4

    },
    {
        name: 'peter',
        review: 'sdfsdgfffffffwer  sfdsdf  dfg dgf sa das das wqefhgfghfghfgeqw eqw',
        stars: 5

    },
    {
        name: 'mary',
        review: 'sdfsdf dghfgfd g qwefghfghfghfghfghr  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'jason',
        review: 'fghfghfghfsfdsfdfdssdffds  qw qw eqw eqwgdf dgfgdffffffd fgdfgffff df gdf gfffffddfg dfg dfg',
        stars: 3

    },
    {
        name: 'mathias',
        review: 'dfgdggggggggggggggggggggggg dfgdfg dgdfdfgdfdfg dfgdfgdghfgffghfghfghfghfghfhfsa fghfghfgqer  qw qhfghfghfghfghfghgfh eqw eqw',
        stars: 2

    },
    {
        name: 'marina',
        review: 'sdfsdf dghfgfd g qwewer  sfdsdf  dfg dgf sa das das wqer  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'pedro',
        review: 'sdfsdfsdsdf shfghgfhfg fghjkghwqq eqw eqwewrert etr sfdsdf sdf',
        stars: 4

    },
    {
        name: 'bruno',
        review: 'sdfsdf dghfgf',
        stars: 3

    },
    {
        name: 'john',
        review: 'sdfsdf dghfgfd g qasdasdasdasdsddas das wqer  qw qw eqw eqw',
        stars: 4

    },
    {
        name: 'peter',
        review: 'sdfsdgfffffffwer  sfdsdf  dfg dgf sa das das wqefhgfghfghfgeqw eqw',
        stars: 5

    },
    {
        name: 'mary',
        review: 'sdfsdf dghfgfd g qwefghfghfghfghfghr  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'jason',
        review: 'fghfghfghfsfdsfdfdssdffds  qw qw eqw eqwgdf dgfgdffffffd fgdfgffff df gdf gfffffddfg dfg dfg',
        stars: 3

    },
    {
        name: 'mathias',
        review: 'dfgdggggggggggggggggggggggg dfgdfg dgdfdfgdfdfg dfgdfgdghfgffghfghfghfghfghfhfsa fghfghfgqer  qw qhfghfghfghfghfghgfh eqw eqw',
        stars: 2

    },
    {
        name: 'marina',
        review: 'sdfsdf dghfgfd g qwewer  sfdsdf  dfg dgf sa das das wqer  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'pedro',
        review: 'sdfsdfsdsdf shfghgfhfg fghjkghwqq eqw eqwewrert etr sfdsdf sdf',
        stars: 4

    },
    {
        name: 'bruno',
        review: 'sdfsdf dghfgf',
        stars: 3

    },
    {
        name: 'john',
        review: 'sdfsdf dghfgfd g qasdasdasdasdsddas das wqer  qw qw eqw eqw',
        stars: 4

    },
    {
        name: 'peter',
        review: 'sdfsdgfffffffwer  sfdsdf  dfg dgf sa das das wqefhgfghfghfgeqw eqw',
        stars: 5

    },
    {
        name: 'mary',
        review: 'sdfsdf dghfgfd g qwefghfghfghfghfghr  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'jason',
        review: 'fghfghfghfsfdsfdfdssdffds  qw qw eqw eqwgdf dgfgdffffffd fgdfgffff df gdf gfffffddfg dfg dfg',
        stars: 3

    },
    {
        name: 'mathias',
        review: 'dfgdggggggggggggggggggggggg dfgdfg dgdfdfgdfdfg dfgdfgdghfgffghfghfghfghfghfhfsa fghfghfgqer  qw qhfghfghfghfghfghgfh eqw eqw',
        stars: 2

    },
    {
        name: 'marina',
        review: 'sdfsdf dghfgfd g qwewer  sfdsdf  dfg dgf sa das das wqer  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'pedro',
        review: 'sdfsdfsdsdf shfghgfhfg fghjkghwqq eqw eqwewrert etr sfdsdf sdf',
        stars: 4

    },
    {
        name: 'bruno',
        review: 'sdfsdf dghfgf',
        stars: 3

    },
    {
        name: 'john',
        review: 'sdfsdf dghfgfd g qasdasdasdasdsddas das wqer  qw qw eqw eqw',
        stars: 4

    },
    {
        name: 'peter',
        review: 'sdfsdgfffffffwer  sfdsdf  dfg dgf sa das das wqefhgfghfghfgeqw eqw',
        stars: 5

    },
    {
        name: 'mary',
        review: 'sdfsdf dghfgfd g qwefghfghfghfghfghr  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'jason',
        review: 'fghfghfghfsfdsfdfdssdffds  qw qw eqw eqwgdf dgfgdffffffd fgdfgffff df gdf gfffffddfg dfg dfg',
        stars: 3

    },
    {
        name: 'mathias',
        review: 'dfgdggggggggggggggggggggggg dfgdfg dgdfdfgdfdfg dfgdfgdghfgffghfghfghfghfghfhfsa fghfghfgqer  qw qhfghfghfghfghfghgfh eqw eqw',
        stars: 2

    },
    {
        name: 'marina',
        review: 'sdfsdf dghfgfd g qwewer  sfdsdf  dfg dgf sa das das wqer  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'pedro',
        review: 'sdfsdfsdsdf shfghgfhfg fghjkghwqq eqw eqwewrert etr sfdsdf sdf',
        stars: 4

    },
    {
        name: 'bruno',
        review: 'sdfsdf dghfgf',
        stars: 3

    },
    {
        name: 'john',
        review: 'sdfsdf dghfgfd g qasdasdasdasdsddas das wqer  qw qw eqw eqw',
        stars: 4

    },
    {
        name: 'peter',
        review: 'sdfsdgfffffffwer  sfdsdf  dfg dgf sa das das wqefhgfghfghfgeqw eqw',
        stars: 5

    },
    {
        name: 'mary',
        review: 'sdfsdf dghfgfd g qwefghfghfghfghfghr  qw qw eqw eqw',
        stars: 5

    },
    {
        name: 'jason',
        review: 'fghfghfghfsfdsfdfdssdffds  qw qw eqw eqwgdf dgfgdffffffd fgdfgffff df gdf gfffffddfg dfg dfg',
        stars: 3

    },
    {
        name: 'mathias',
        review: 'dfgdggggggggggggggggggggggg dfgdfg dgdfdfgdfdfg dfgdfgdghfgffghfghfghfghfghfhfsa fghfghfgqer  qw qhfghfghfghfghfghgfh eqw eqw',
        stars: 2

    },




]

const ReviewSection = () => {
    const carouselRef = useRef();
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
  
    const snapToNearest = () => {
      const container = carouselRef.current;
      const children = container.children;
  
      if (children.length === 0) return;
  
      const childWidth = children[0].getBoundingClientRect().width + 16;
      const currentIndex = Math.round(container.scrollLeft / childWidth);
      const targetIndex = Math.max(0, Math.min(currentIndex, children.length - 1));
  
      container.scrollTo({
        left: targetIndex * childWidth,
        behavior: 'smooth',
      });
    };
  
    const handleStart = (e) => {
      setIsMouseDown(true);
      const clientX = e.type === 'mousedown' ? e.pageX : e.touches[0].clientX;
      setStartX(clientX - carouselRef.current.offsetLeft);
      setScrollLeft(carouselRef.current.scrollLeft);
    };
  
    const handleEnd = () => {
      setIsMouseDown(false);
      snapToNearest();
    };
  
    const handleMove = (e) => {
      if (!isMouseDown) return;
  
      const clientX = e.type === 'mousemove' ? e.pageX : e.touches[0].clientX;
      const x = clientX - carouselRef.current.offsetLeft;
      const walk = x - startX;
      carouselRef.current.scrollLeft = scrollLeft - walk;
    };
  
    useEffect(() => {
      const onMoveWindow = (e) => handleMove(e);
      const onEndWindow = () => handleEnd();
  
      if (isMouseDown) {
        window.addEventListener('mousemove', onMoveWindow);
        window.addEventListener('mouseup', onEndWindow);
        window.addEventListener('touchmove', onMoveWindow);
        window.addEventListener('touchend', onEndWindow);
      }
  
      return () => {
        window.removeEventListener('mousemove', onMoveWindow);
        window.removeEventListener('mouseup', onEndWindow);
        window.removeEventListener('touchmove', onMoveWindow);
        window.removeEventListener('touchend', onEndWindow);
      };
    }, [isMouseDown, handleMove, handleEnd]);
  
    const moveLeftByOneCard = () => {
        const container = carouselRef.current;
        const children = container.children;
      
        if (children.length === 0) return;
      
        const childWidthWithGap = children[0].getBoundingClientRect().width + 16; 
        const currentIndex = Math.round(container.scrollLeft / childWidthWithGap);
        const targetIndex = Math.max(0, Math.min(currentIndex + 1, children.length - 1));
      
        container.scrollTo({
          left: targetIndex * childWidthWithGap,
          behavior: 'smooth',
        });
      };
      
      useEffect(() => {
        const interval = setInterval(() => {
          moveLeftByOneCard();
        }, 5000);
      
        return () => {
          clearInterval(interval);
        };
      }, []);

    return (
      <div
        ref={carouselRef}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseMove={handleMove}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onTouchMove={handleMove}
        className="overflow-hidden mx-auto py-4 flex items-center space-x-4 cursor-default touch-pan-y
                    w-[16rem] md:w-[32rem]  lg:w-[48rem] xl:w-[64rem] 2xl:w-[80rem]
        "
      >
        {reviews.map((item, index) => (
          <ReviewCard key={index} item={item} />
        ))}
      </div>
    );
  };
  
  export default ReviewSection;