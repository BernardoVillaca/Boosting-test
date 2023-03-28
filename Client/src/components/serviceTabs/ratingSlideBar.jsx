import React, { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import { FiArrowRight } from "react-icons/fi";
import { useContext } from "react";
import { ServicePageContext } from "../context/service-page.context";
import ServiceTabContainer from "./serviceTabContainer";


const RatingSlideBar = ({ min, max }) => {

    const onChange = ({ min, max }) => (`min = ${min}, max = ${max}`)
    const { currentRating, setCurrentRating } = useContext(ServicePageContext)
    const { desiredRating, setDesiredRating } = useContext(ServicePageContext)
    const currentRatingRef = useRef(null);
    const desiredRatingRef = useRef(null);
    const range = useRef(null);

    useEffect(() => {
        setCurrentRating(min)
        setDesiredRating(max)
    }, [])

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (desiredRatingRef.current) {
            const minPercent = getPercent(currentRating);
            const maxPercent = getPercent(desiredRatingRef.current.value); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [currentRating, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (currentRatingRef.current) {
            const minPercent = getPercent(currentRatingRef.current.value);
            const maxPercent = getPercent(desiredRating);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [desiredRating, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: currentRating, max: desiredRating });
    }, [currentRating, desiredRating, onChange]);

    return (
        <ServiceTabContainer tabName={'Rating'}>
            <div className="h-full ">
                <div className="flex  h-12 items-end ">
                    <div className="flex flex-col h-12">
                        <span className="text-secondary/gray">Current</span>
                        <input
                            className="h-4 w-14 text-center outline-none bg-primary/purple rounded-md"
                            min={min}
                            max={max}
                            value={currentRating > desiredRating ? desiredRating - 50 : currentRating < 0 ? 0 : currentRating > max - 50 ? max : currentRating}
                            onChange={(e) => { e.target.value > desiredRating - 50 ? setCurrentRating(desiredRating - 50) : e.target.value > max ? setCurrentRating(desiredRating - 50) : setCurrentRating(e.target.value) }}
                        >
                        </input>
                    </div>
                    <FiArrowRight className="mb-2 text-white" />
                    <div className="flex flex-col h-12">
                        <span className="text-secondary/gray">Desired</span>
                        <input
                            className="h-4 w-14 text-center outline-none bg-primary/purple rounded-md"
                            min={min}
                            max={max}
                            onChange={(e) => { e.target.value > max ? setDesiredRating(max) : setDesiredRating(e.target.value) }}
                            value={desiredRating > max ? max : desiredRating}
                        >
                        </input>
                    </div>
                </div>
                <div className=" w-full py-3">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={currentRating}
                        ref={currentRatingRef}
                        onChange={(event) => {
                            const value = Math.min(event.target.value, desiredRating - 50);
                            setCurrentRating(value);
                            
                        }}
                        className={classnames("thumb thumb--zindex-3", {
                            "thumb--zindex-5": currentRating > max - 100
                        })}
                    />
                    <input
                        type="range"
                        step={desiredRating <= 1500 ? 100 : 50}
                        min={min}
                        max={max}
                        value={desiredRating}
                        ref={desiredRatingRef}
                        onChange={(event) => {
                            const value = Math.max(event.target.value, currentRating);
                            setDesiredRating(value);
                            
                        }}
                        className="thumb thumb--zindex-4"
                    />
                    <div className="slider">
                        <div className="slider__track" />
                        <div ref={range} className="slider__range" />
                        <div className="slider__left-value">{currentRating < 0 ? 0 : currentRating}</div>
                        <div className="slider__right-value">{desiredRating > max ? max : desiredRating}</div>
                    </div>
                </div>
            </div>
        </ServiceTabContainer>

    );
};

export default RatingSlideBar;