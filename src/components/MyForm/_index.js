// @vue/component
export default {
  name: 'MyForm',
  components: {},
  mixins: [],
  emits: [],
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
    rule: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    datas: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    shortcuts: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    }
  },

  data() {
    return {
    }
  },

  computed: {
    checkKey: {
      get() {
        return this.shortcuts.name
      }
    }
  },

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
    getShortcut(word) {
      for (let i = 0; i < this.shortcuts.keys.length; i++) {
        const shortcut = this.shortcuts.keys[i]
        if (shortcut.regex) {
          if (shortcut.regex.test(word)) {
            return shortcut
          }
        } else {
          if (word === shortcut.key) {
            return shortcut
          }
        }
      }
      return null
    },
    onKeyPress(event, colName) {
      if (colName === this.checkKey) {
        const shortcut = this.getShortcut(this.datas[this.checkKey])
        if (shortcut) {
          for (const key in shortcut.data) {
            this.$set(this.datas, key, shortcut.data[key])
          }
        }
      }
    }
  }
}
