// @vue/component
export default {
  name: 'EREntity',
  components: {},
  mixins: [],
  emits: ['selected'],
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
      required: false,
      default: 100
    },
    height: {
      type: Number,
      required: false,
      default: 100
    },
    type: {
      type: String,
      required: false,
      default: 'bus'
    },
    data: {
      type: Object,
      required: false,
      default: null
    }
  },

  data() {
    return {
    }
  },

  computed: {},

  watch: {},
  mounted() {
  },
  // created() {
  // },

  methods: {
    onClick() {
      this.$emit('selected', this.data)
    }
  }
}
