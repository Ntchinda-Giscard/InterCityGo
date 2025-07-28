// metro.config.js

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

// 1. Start from Expo’s default Metro config
let config = getDefaultConfig(__dirname);

// 2. Plug in NativeWind (tailwind css-in-js)
//    — the `input` path should point to where your global.css lives
config = withNativeWind(config, {
  input: "./global.css",
});

// 3. Finally wrap it with Reanimated’s config so its Babel plugin & asset plugin get registered
module.exports = wrapWithReanimatedMetroConfig(config);
