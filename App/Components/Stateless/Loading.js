import React from "react";
import { View, ActivityIndicator, StyleSheet, StatusBar } from "react-native";

const Loading = ({ statusBar, style }) => (
  <View style={[styles.loading, { ...style }]}>
    <ActivityIndicator />
    {statusBar && <StatusBar barStyle="default" hidden />}
  </View>
);

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center"
  }
});

export default Loading;
