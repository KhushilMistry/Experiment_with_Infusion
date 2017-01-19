var demo = demo || {};
(function () {
    "use strict";

    fluid.defaults("demo.weightConverter", {
        gradeNames: "fluid.rendererComponent",
        selectors: {
            enter_weight: ".enter-weight",
            display_weight: ".display-weight",
            heading: ".heading",
            planet: ".planet-selector",
            gravity: ".planet-gravity",
            planet_name: ".planet-name",
            planet_info: ".planet-information",
            planet_image: ".planet-image"
        },
        model: {
            enter_weight: 60,
            enter_weight_string: "60",
            display_weight: 12,
            planet: {
                names: ["Sun", "Earth", "Jupiter", "Neptune", "Saturn", "Uranus", "Venus", "Mars", "Mercury", "Moon", "Pluto"],
                values: ["28.24", "1", "2.57", "1.14", "1.07", "0.89", "0.9", "0.39", "0.38", "0.16", "0.06"],
                information: [
                    "The Sun is by far the largest object in the solar system. It contains more than 99.8% of the total mass of the Solar System (Jupiter contains most of the rest). It is often said that the Sun is an ordinary star. That's true in the sense that there are many others similar to it. But there are many more smaller stars than larger ones; the Sun is in the top 10% by mass. The median size of stars in our galaxy is probably less than half the mass of the Sun.",
                    "Earth has more exposed water than land.  Three quarters of the Earth is covered by water! The earth has one moon.",
                    "Jupiter is the largest planet in the solar system, but it spins very quickly on its axis.  A day on Jupiter lasts only 9 hours and 55 minutes.  Ack, I get dizzy just thinking about it!Jupiter is so big that you could fit all the other planets in the solar system inside it.The red spot of Jupiter is the biggest, most violent storm in the known universe-- that spot is at least three times the size of earth!",
                    "Neptune was discovered in 1846.  In 2011 it finally made it's first lap around the sun since we discovered it -- because one Neptune year lasts 165 Earth years!Like Jupiter, Neptune has a dark spot caused by a storm.  Neptune's spot is smaller than Jupiter's -- it is only about the size of the planet earth.",
                    "Saturn is the second biggest planet, but it’s also the lightest planet.  If there was a bathtub big enough to hold Saturn, it would float in the water!The rings that surrounds Saturn could be the remnants of a moon that was shattered by Saturn's gravity.  Saturn's rings are as wide as 22 planet earths all in a row but are only 30 feet thick!",
                    "Uranus’ axis is at a 97 degree angle, meaning that it orbits lying on its side!  Talk about a lazy planet.Uranus has the second most complex set of rings in our solar system (Saturn has the most defined rings).",
                    "Venus is the brightest planet in our sky and can sometimes be seen with the naked eye if you know where to look.  It is the solar system's brightest planet -- yellow clouds of sulfuric acid reflect the sun's light.",
                    "Mars is the home of Olympus Mons, the largest volcano found in the solar system.  It stands about 27 kilometers high with a crater 81 kilometers wide.",
                    "Mercury takes 59 days to make a rotation but only 88 days to circle the Sun.  That means that there are fewer than 2 days in a year! Many astronomers believe that Mercury might be the core of what was once a much larger planet -- it appears to be a huge ball of iron covered by a thin layer of rock.",
                    "The Moon, of course, has been known since prehistoric times. It is the second brightest object in the sky after the Sun. As the Moon orbits around the Earth once per month, the angle between the Earth, the Moon and the Sun changes; we see this as the cycle of the Moon's phases. The time between successive new moons is 29.5 days (709 hours), slightly different from the Moon's orbital period (measured against the stars) since the Earth moves a significant distance in its orbit around the Sun in that time.",
                    "Pluto’s orbit sometimes brings it closer to the Sun than Neptune.  It jumped ahead of Neptune on September 5, 1989 and remained there until February, 1999 when it went back to being the farthest."
                ],
                images: [
                    "images/sun.jpg",
                    "images/earth.jpg",
                    "images/jupitor.jpg",
                    "images/neptune.jpg",
                    "images/saturn.jpg",
                    "images/uranus.jpg",
                    "images/venus.jpg",
                    "images/mars.jpg",
                    "images/mercury.jpg",
                    "images/moon.jpg",
                    "images/pluto.jpg"
                ]
            },
            currentPlanet: "1",
            heading: "Weight Converter on Different Planets",
            multiplier: 1,
            gravity: 9.7,
            planet_name: "Earth",
            index: 0,
            planet_info: "",
            planet_src: "images/earth.jpg",
            planet_image: ""
        },
        protoTree: {
            enter_weight: "${enter_weight_string}",
            planet: {
                optionnames: "${planet.names}",
                optionlist: "${planet.values}",
                selection: "${currentPlanet}"
            },
            display_weight: "${display_weight}",
            heading: "${heading}",
            gravity: "${gravity}",
            planet_name: "${planet_name}",
            planet_info: "${planet_info}",
            planet_image: "${planet_image}"
        },
        modelListeners: {
            "planet_name": {
                func: "{that}.refreshView"
            },
            "display_weight": {
                func: "{that}.refreshView"
            },
            "gravity": {
                func: "{that}.refreshView"
            },
            "planet_image": {
                func : "{that}.displayImage",
                args : ["{that}.model.planet_image","{that}.model.planet_src"]
            }
            ,
            "": "{that}.output"
        },
        events : {
            onSelect : null
        },
        modelRelay: [
            {
                source: "{demo.weightConverter}.model.enter_weight_string",
                target: "enter_weight",
                singleTransform: {
                    type: "fluid.transforms.stringToNumber"
                }
            },
            {
                source: "{demo.weightConverter}.model.currentPlanet",
                target: "multiplier",
                singleTransform: {
                    type: "fluid.transforms.stringToNumber"
                }
            },
            {
                target: "display_weight",
                singleTransform: {
                    type: "fluid.transforms.linearScale",
                    input: "{demo.weightConverter}.model.enter_weight",
                    factor: "{that}.model.multiplier"
                }
            },
            {
                target: "gravity",
                singleTransform: {
                    type: "fluid.transforms.linearScale",
                    input: "{demo.weightConverter}.model.multiplier",
                    factor: 9.7
                }
            },
            {
                target: "gravity",
                singleTransform: {
                    type: "fluid.transforms.round",
                    input: "{demo.weightConverter}.model.gravity"
                }

            },
            {
                target: "display_weight",
                singleTransform: {
                    type: "fluid.transforms.round",
                    input: "{demo.weightConverter}.model.display_weight"
                }

            },
            {
                target: "index",
                singleTransform: {
                    type: "fluid.transforms.indexOf",
                    array: "{demo.weightConverter}.model.planet.values",
                    input: "{demo.weightConverter}.model.currentPlanet"
                }
            },
            {
                target: "planet_name",
                singleTransform: {
                    type: "fluid.transforms.dereference",
                    array: "{demo.weightConverter}.model.planet.names",
                    input: "{demo.weightConverter}.model.index"
                }
            },
            {
                target: "planet_info",
                singleTransform: {
                    type: "fluid.transforms.dereference",
                    array: "{demo.weightConverter}.model.planet.information",
                    input: "{demo.weightConverter}.model.index"
                }
            },
            {
                target: "planet_src",
                singleTransform: {
                    type: "fluid.transforms.dereference",
                    array: "{demo.weightConverter}.model.planet.images",
                    input: "{demo.weightConverter}.model.index"
                }
            }

        ],
        listeners: {

        },
        invokers: {
            output: {
                funcName: "demo.weightConverter.output",
                args: ["{that}.model"]
            },
            displayImage: {
                funcName: "demo.weightConverter.displayImage",
                args: ["{that}.dom.planet_image","{that}.model.planet_src"]
            },
            print: {
                funcName: "demo.weightConverter.print"
            }
        },
        renderOnInit: true
    });

    demo.weightConverter.output = function (model) {
        console.log(model)
    };

    demo.weightConverter.displayImage = function (image,src){
        image.attr({
            src: src
        });
        console.log("Hello");
    };

    demo.weightConverter.print = function () {
        console.log("Hey..!!");
    };


})();


var s = demo.weightConverter(".converter");
