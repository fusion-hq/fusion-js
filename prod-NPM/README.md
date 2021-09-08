# What is this ?

Send user behaviour analytics data from JS/TS based products

# Installations

`npm -i fusion-analytics-js --save`

Then...

```
import fusion from "fusion-analytics-js";

fusion.init("YOUR_FUSION_API_KEY", "FUSION_HOST_URL", true);

//Manually send pageview event
fusion.track("Pageview");

//Resgiter ice_cream property and value
fusion.register({ ice_cream: "vanilla-chocolate" });

// Send an event with above property added
fusion.track("event-with-icecream");

//Unresgiter ice_cream property
fusion.unregister("ice_cream");

//Custom event with no ice_cream property
fusion.track("event-with-no-icecream");

//Manually send Played song event with custom property and value
fusion.track("Played song", {genre: "Rock"});

//Identify user with a user defined unique id (typically used during login)
fusion.indentify("UNIQUE_ID");
```
