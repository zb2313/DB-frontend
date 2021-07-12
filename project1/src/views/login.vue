<template>
  <div>
    <h1>Bitcoin Price Index</h1>
    <div v-for="currency in info">
      {{ currency.code }}:
      <span>
        <span v-html="currency.symbol"></span
        >{{ currency.rate_float | currencydecimal }}
      </span>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  data() {
    return {
      info: null,
    };
  },
  mounted() {
    this.$axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => (this.info = response.data.bpi));
  },
  filters: {
    currencydecimal(value) {
      return value.toFixed(2);
    },
  },
};
</script>
