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
    const carouselRef = useRef(null);
    const [dragStart, setDragStart] = useState(0);
    const [dragStartScroll, setDragStartScroll] = useState(0);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dragging) return;
            const deltaX = e.clientX - dragStart;
            const scrollLeft = dragStartScroll - deltaX;
            carouselRef.current.scrollLeft = scrollLeft;
        };

        const handleMouseUp = () => {
            if (!dragging) return;
            setDragging(false);
            snapToItem();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, dragStart, dragStartScroll]);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setDragStart(e.clientX);
        setDragStartScroll(carouselRef.current.scrollLeft);
        setDragging(true);
    };

    const snapToItem = () => {
        const carousel = carouselRef.current;
        const items = carousel.children;
        const itemWidth = items[0].getBoundingClientRect().width;
        const carouselWidth = carousel.getBoundingClientRect().width;
        const scrollLeft = carousel.scrollLeft;
        const snapPoints = Array.from(items).map((item) => item.offsetLeft - (carouselWidth - itemWidth) - 112 / 2);

        let closestSnapPoint = null;
        let closestDistance = Infinity;
        snapPoints.forEach((snapPoint) => {
            const distance = Math.abs(scrollLeft - snapPoint);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSnapPoint = snapPoint;
            }
        });

        const snappedScrollLeft = Math.round(closestSnapPoint);
        carousel.scrollTo({
            left: snappedScrollLeft,
            behavior: 'smooth',
        });
    };

    // Automatically scroll the carousel every 5 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            const carousel = carouselRef.current;
            const items = carousel.children;
            const itemWidth = items[0].getBoundingClientRect().width;
            const carouselWidth = carousel.getBoundingClientRect().width;
            const scrollLeft = carousel.scrollLeft;

            let currentSnapPoint = null;
            let currentDistance = Infinity;
            const snapPoints = Array.from(items).map((item) => item.offsetLeft - (carouselWidth - itemWidth) - 112 / 2);
            snapPoints.forEach((snapPoint) => {
                const distance = Math.abs(scrollLeft - snapPoint);
                if (distance < currentDistance) {
                    currentDistance = distance;
                    currentSnapPoint = snapPoint;
                }
            });

            const nextIndex = snapPoints.indexOf(currentSnapPoint) + 1;
            const nextSnapPoint = nextIndex < snapPoints.length ? snapPoints[nextIndex] : snapPoints[0];
            const snappedScrollLeft = Math.round(nextSnapPoint);
            carousel.scrollTo({
                left: snappedScrollLeft,
                behavior: 'smooth',
            });
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div
            className="overflow-x-hidden whitespace-nowrap py-4 w-[112rem] space-x-[1rem] border-b-[1px] border-secondary/gray border-opacity-20 "
            style={{ scrollbarWidth: 'none' }}
            ref={carouselRef}
            onMouseDown={handleMouseDown}
        >
            {reviews.map((item, index) => (
                <ReviewCard key={index} item={item} />
            ))}
        </div>
    );
};

export default ReviewSection;