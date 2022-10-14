// import { getDefaultConfig } from "@expo/metro-config";

// const defaultConfig = getDefaultConfig(__dirname);

// defaultConfig.resolver.soureExts.push("cjs");

// export default defaultConfig;
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  //added this
  resolver: {
    sourceExts: ["jsx", "js", "ts", "tsx", "cjs"],
  },
};
