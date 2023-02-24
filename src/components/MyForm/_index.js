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
    }
  },

  data() {
    return {
      value: null
    }
  },

  computed: {},

  watch: {},

  // created () {},

  methods: {}
}
