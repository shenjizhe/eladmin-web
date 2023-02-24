// @vue/component
export default {
  name: 'MyForm',
  components: {},
  mixins: [],

  props: {
    columns: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    rules: {}
  },

  data() {
    return {
      value: {}
    }
  },

  computed: {},

  watch: {},

  // created () {},

  methods: {}
}
