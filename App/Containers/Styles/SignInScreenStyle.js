import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center",
    padding: 30
    // alignItems: 'center'
  },
  top: {
    top: "-25px"
  },
  forget: {
    color: "#9da3b4",
    fontFamily: "Poppins-Light",
    fontSize: 12,
    textDecorationLine: "underline",
    marginTop: 20,
    textAlign: "center"
  },
  seperror: {
    backgroundColor: "#f3534aff"
  },
  gradientButton: {
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 30,
    height: "auto",
    marginTop: 5
  },
  gradientButtonText: {
    color: "#fbfbfb",
    fontFamily: "Poppins-Medium",
    fontSize: 14
  },
  label: {
    color: "#c5ccd6",
    fontFamily: "Poppins-Light",
    fontSize: 14
  },
  inputContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%"
  },
  error: {
    color: "#f3534a"
  },
  left: {
    flexGrow: 1,
    maxWidth: "100%"
  },
  textInput: {
    color: "#323643",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    padding: 0,
    margin: 0,
    left: 0,
    width: "100%"
  },
  separator: {
    height: 1,
    borderRadius: 1,
    backgroundColor: "#e1e3e8",
    opacity: 0.6,
    marginTop: 0,
    marginBottom: 20,
    top: -8
  }
});
