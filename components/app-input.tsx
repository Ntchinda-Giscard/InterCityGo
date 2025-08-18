import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const AppInput = (props: TextInpuProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS lifts, Android shrinks
      keyboardVerticalOffset={10}
    >
      <TouchableWithoutFeedback>
        <View className={props.className}>
          {props && props.iconLeft}
          <TextInput
            className={"text-base text-white text-normal"}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            value={props.value}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AppInput;
