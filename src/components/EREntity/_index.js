// @vue/component
export default {
  name: 'EREntity',
  components: {},

  mixins: [],

  props: {
    title: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: false,
      default: ''
    },
    x: {
      type: Number,
      required: false,
      default: 0
    },
    y: {
      type: Number,
      required: false,
      default: 0
    },
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    },
    type: {
      type: String,
      required: 0
    }
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},
  mounted() {
  },
  // created() {
  // },

  methods: {

  }
}
