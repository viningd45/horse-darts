<template>
  <div>
    <input
      type="text"
      v-bind:value="value"
      v-bind="$attrs"
      :placeholder="placeholder"
      v-on="inputListeners"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    placeholder: String,
    value: String,
  },
  data: function () {
    return {};
  },
  computed: {
    inputListeners: function () {
      var vm = this;
      return Object.assign({}, this.$listeners, {
        blur: function (event) {
          vm.$emit("blur", event.target.value);
        },
        input: function (event) {
          vm.$emit("input", event.target.value);
        },
        keyupEnter: function (event) {
          vm.$emit("keyup.enter", event.target.value);
        },
      });
    },
  },
};
</script>

<style scoped>
input {
  width: 100vw;
  height: 40px;
  box-sizing: border-box;
  border-radius: 5px;
  border: solid 1px #dcdfe6;
  font-size: 0.9em;
  padding-left: 1vw;
  font-weight: normal;
  font-family: Arial, Helvetica, sans-serif;
}

/* copied from W3 schools */
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #c0c4cc;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #c0c4cc;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #c0c4cc;
}

@media only screen and (max-width: 600px) {
  input {
    padding-left: 3vw;
  }
}

input:focus {
  outline-offset: 0;
  border: solid 1px #dcdfe6;
  outline: none;
}
</style>