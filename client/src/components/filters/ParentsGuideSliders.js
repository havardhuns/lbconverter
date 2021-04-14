import React, { useEffect, useState } from "react";
import Slider, { Range } from "rc-slider";
import { updateQuery, removeFromQuery } from "../../store/actions/FilterAction";
import { useSelector, useDispatch } from "react-redux";

import "rc-slider/assets/index.css";

const ParentsGuideSliders = (props) => {
  const severities = ["None", "Mild", "Moderate", "Severe"];
  const dispatch = useDispatch();
  const query = useSelector((state) => state.filters.query);

  const setParentsGuide = (key, value) => {
    let values = range(value[0], value[1]).map((value) => severities[value]);
    key = "imdb_parents_guide." + key;
    if (values.length === 4) {
      if (key in query) {
        dispatch(removeFromQuery(key));
      }
    } else {
      dispatch(updateQuery({ [key]: { $in: values } }));
    }
  };

  const range = (start, end) => {
    let arr = [];
    while (start <= end) {
      arr.push(start);
      start += 1;
    }
    return arr;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: "50px",
      }}
    >
      <SingleSlider
        text="Sex & Nudity"
        id="nudity"
        onChange={setParentsGuide}
      />
      <SingleSlider
        text="Violence & Gore"
        id="violence"
        onChange={setParentsGuide}
      />
      <SingleSlider
        text="Profanity"
        id="profanity"
        onChange={setParentsGuide}
      />
      <SingleSlider
        text="Alcohol, Drugs & Smoking"
        id="alcohol"
        onChange={setParentsGuide}
      />
      <SingleSlider
        text="Frightening & Intense Scenes"
        id="frightening"
        onChange={setParentsGuide}
      />
    </div>
  );
};

const SingleSlider = (props) => {
  const marks = {
    0: { label: "None" },
    1: { label: "Mild" },
    2: { label: "Moderate" },
    3: {
      style: {
        color: "red",
      },
      label: "Severe",
    },
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "450px",
        height: "50px",
      }}
    >
      <div style={{ flex: "2 1 0px", paddingRight: "30px" }}>
        <p>{props.text}</p>
      </div>
      <Slider.Range
        marks={marks}
        step={null}
        max={3}
        style={{ flex: "5 1 0px", justifyContent: "flex-end" }}
        defaultValue={[0, 3]}
        onAfterChange={(change) => props.onChange(props.id, change)}
      />
    </div>
  );
};

const style = {
  slider: {},
};

export default ParentsGuideSliders;
