<template>
  <div class="otp">
    <div v-for="n in numInputs" :key="n">
      <input
        ref="input"
        type="text"
        maxlength="1"
        size="1"
        min="0"
        max="9"
        pattern="[0-9]{1}"
        @click="focusOnClick(n)"
        @keyup="focusOnKeyUp($event, n)"
        @keydown="onKeyDownPress"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    numInputs: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      activeRefIndex: 0
    };
  },
  mounted: function() {
    this.$refs.input[0].focus();
  },
  methods: {
    updateModel() {
      const otp = this.$refs.input.reduce((final, cur) => {
        return final + cur.value;
      }, "");
      if (otp.length === this.numInputs) {
        this.$emit("change", otp);
      } else this.$emit("change", null);
    },
    focusOnClick(idx) {
      this.activeRefIndex = idx - 1;
      this.$refs.input[this.activeRefIndex].focus();
    },
    focusOnKeyUp(e, idx) {
      const { numInputs } = this;
      const key = e.which ? e.which : e.keyCode;
      if ((key === 8 || key === 46) && this.activeRefIndex > 0) {
        // if delete or backspace focus previous element
        this.activeRefIndex--;
        this.$refs.input[this.activeRefIndex].focus();
      } else if (idx && this.activeRefIndex < numInputs - 1) {
        // check the current value only then focus the next one
        this.activeRefIndex = idx;
        if (this.$refs.input[this.activeRefIndex - 1].value) {
          this.$refs.input[this.activeRefIndex].focus();
        }
      }
      this.updateModel();
    },
    onKeyDownPress(e) {
      // for allowing only numbers
      const key = e.which ? e.which : e.keyCode;
      if (key > 57) {
        e.preventDefault();
      } else if (key < 48) {
        // we don't want to disable left arrow (37), right arrow (39), delete (8) or tab (9)
        // otherwise the use cannot correct their entry or tab into the next field!

        if (key !== 8 && key !== 9 && key !== 37 && key !== 39) {
          e.preventDefault();
          return false;
        }
      }
      this.updateModel();
    }
  }
};
</script>
<style lang="scss" scoped>
.otp {
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 0;
    width: 42px;
    text-align: center;
    font-size: 16px;
    margin-right: 18px;
    outline: 0;

    &:focus {
      border: none;
      border-bottom: 1.5px solid #007bff;
    }
  }
}
</style>
