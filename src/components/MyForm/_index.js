// @vue/component
export default {
  name: 'MyForm',
  components: {},
  mixins: [],
  emits: ['enterkey'],
  props: {
    columns: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    dicts: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    rule: {},
    name: null,
    data: {}
  },

  data() {
    return {
      value: {}
    }
  },

  computed: {},

  watch: {},

  created() {
  },
  mounted() {
    if (this.$refs.mark) {
      this.$refs.mark[0].focus()
    }
  },

  methods: {
    validate(e) {
      return this.$refs.form.validate(e)
    },
    clearValidate(e) {
      return this.$refs.form.clearValidate(e)
    },
    onKeyPress(event, colName, value) {
      this.$emit('enterkey', colName, value)
    }
  }
}
