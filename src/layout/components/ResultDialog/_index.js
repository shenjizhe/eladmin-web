// import { Morpheme } from '@/api/morpheme/Morpheme'
// import { add as eventAdd } from '@/api/studyEvent'
//
// export default {
//   name: 'result-dialog',
//   props: {},
//   components: {},
//   data() {
//     return {
//       url: 'https://www.quword.com/root/',
//       show: {
//         review: false,
//       },
//   },
//
//   computed: {
//     modeMorpheme: {
//       get() {
//         if (this.search.mode) {
//           return this.search.morpheme.current
//         } else {
//           return this.pair.morphemeStudy
//         }
//       }
//     },
//   },
//
//   watch: {
//     mode: {
//       handler(newVal, oldVal) {
//         if (newVal > 7) {
//           this.mode = 7
//         } else if (newVal < 0) {
//           this.mode = 0
//         } else {
//           this.mode = newVal
//         }
//         switch (this.mode) {
//           case 7: // 学习模式
//             this.show.morpheme = true
//             this.show.morphemeMeaning = true
//             this.show.morphemeInfo = true
//             this.show.word = true
//             this.show.deduct = true
//             this.show.sound = true
//             this.show.deductInfo = true
//             this.show.meaning = true
//             this.show.explain = true
//             break
//           case 6: // 翻译模式
//             this.show.morpheme = false
//             this.show.morphemeMeaning = false
//             this.show.morphemeInfo = false
//             this.show.word = true
//             this.show.deduct = true
//             this.show.sound = true
//             this.show.deductInfo = true
//             this.show.meaning = true
//             this.show.explain = true
//             break
//           case 5: // 含义模式
//             this.show.morpheme = false
//             this.show.morphemeMeaning = false
//             this.show.morphemeInfo = false
//             this.show.word = true
//             this.show.deduct = true
//             this.show.sound = true
//             this.show.deductInfo = true
//             this.show.meaning = true
//             this.show.explain = false
//             break
//           case 4: // 推导模式
//             this.show.morpheme = false
//             this.show.morphemeMeaning = false
//             this.show.morphemeInfo = false
//             this.show.word = true
//             this.show.deduct = true
//             this.show.sound = true
//             this.show.deductInfo = true
//             this.show.meaning = false
//             this.show.explain = false
//             break
//           case 3: // 词根模式
//             this.show.morpheme = false
//             this.show.morphemeMeaning = false
//             this.show.morphemeInfo = false
//             this.show.word = true
//             this.show.deduct = true
//             this.show.sound = true
//             this.show.deductInfo = false
//             this.show.meaning = false
//             this.show.explain = false
//             break
//           case 2: // 读音模式
//             this.show.morpheme = false
//             this.show.morphemeMeaning = false
//             this.show.morphemeInfo = false
//             this.show.word = true
//             this.show.deduct = false
//             this.show.sound = true
//             this.show.deductInfo = false
//             this.show.meaning = false
//             this.show.explain = false
//             break
//           case 1: // 单词模式
//             this.show.morpheme = false
//             this.show.morphemeMeaning = false
//             this.show.morphemeInfo = false
//             this.show.word = true
//             this.show.deduct = false
//             this.show.sound = false
//             this.show.deductInfo = false
//             this.show.meaning = false
//             this.show.explain = false
//             break
//           case 0: // 最简模式
//             this.show.morpheme = false
//             this.show.morphemeMeaning = false
//             this.show.morphemeInfo = false
//             this.show.word = false
//             this.show.deduct = false
//             this.show.sound = false
//             this.show.deductInfo = false
//             this.show.meaning = false
//             this.show.explain = false
//             break
//           default:
//             console.log('default')
//         }
//       }
//     }
//   },
//
//   // vue 生命周期
//   beforeCreate() {
//   },
//
//   created() {
//   },
//
//   beforeMount() {
//     this.helper = new Morpheme()
//     this.helper.uuid()
//       .then(response => {
//         this.statics = response
//       }).catch(error => {
//       this.$message({
//         message: '取得用户统计: ' + error,
//         type: 'fail'
//       })
//     })
//     this.getTodayStatics()
//     this.showCurrent()
//   },
//
//   mounted() {
//     this.getVoices()
//     this.checkFirst()
//     this.checkLast()
//     document.addEventListener('keydown', this.handleArrowKey)
//   },
//
//   beforeDestroy() {
//   },
//
//   destroyed() {
//   },
//   methods: {
//     reset() {
//       this.study.index = 0
//       this.study.morphemeIndex = 0
//       this.study.affixIndex = 0
//       this.study.wordIndex = 0
//     },
//
//     resetAffix(affixId) {
//       this.show.affixExample = false
//       this.helper.findWordsByAffixId(affixId)
//         .then(response => {
//           this.study.affixExamples = response
//           this.study.exampleIndex = 0
//         }).catch(error => {
//         this.$message({
//           message: '取得所有的例词失败: ' + error,
//           type: 'fail'
//         })
//       })
//     },
//     review() {
//       this.helper.getNewDatas()
//         .then(response => {
//           this.todayData = response
//           if (!this.checkEmpty()) {
//             this.reset()
//             this.showView()
//             this.show.review = true
//           } else {
//             this.$message({
//               message: '不需要复习',
//               type: 'warning'
//             })
//           }
//         }).catch(error => {
//         this.$message({
//           message: '取得当天数据失败: ' + error,
//           type: 'fail'
//         })
//       })
//     },
//
//     reviewAffix() {
//       this.helper.needReviewAffixes()
//         .then(response => {
//           this.todayData.affixes = response
//           console.log(response)
//           this.todayData.morphemes = []
//           this.todayData.words = []
//           if (!this.checkEmpty()) {
//             this.reset()
//             this.showView()
//             this.show.review = true
//           } else {
//             this.$message({
//               message: '不需要复习',
//               type: 'warning'
//             })
//           }
//         }).catch(error => {
//         this.$message({
//           message: '取得当天词缀失败: ' + error,
//           type: 'fail'
//         })
//       })
//     },
//
//     saveReview(type) {
//       let event = {}
//       if (this.study.type === 1) {
//         event = {
//           uid: this.uuid,
//           time: new Date(),
//           event: 'review',
//           content: type,
//           morphemeId: this.study.morpheme.id
//         }
//         this.helper.reviewMorpheme(event.morphemeId, type)
//           .then(response => {
//             this.$message({
//               message: type === 1 ? '简单' : type === 2 ? '模糊' : '不记得',
//               type: type === 1 ? 'success' : type === 2 ? 'warning' : 'error'
//             })
//             this.getTodayStatics()
//           })
//       } else if (this.study.type === 2) {
//         event = {
//           uid: this.uuid,
//           time: new Date(),
//           event: 'review',
//           content: type,
//           affixId: this.study.affix.id
//         }
//         this.helper.reviewAffix(event.affixId, type)
//           .then(response => {
//             this.$message({
//               message: type === 1 ? '简单' : type === 2 ? '模糊' : '不记得',
//               type: type === 1 ? 'success' : type === 2 ? 'warning' : 'error'
//             })
//             this.getTodayStatics()
//           })
//       } else if (this.study.type === 3) {
//         event = {
//           uid: this.uuid,
//           time: new Date(),
//           event: 'review',
//           content: type,
//           wordId: this.study.word.id
//         }
//         this.helper.reviewWord(event.wordId, type)
//           .then(response => {
//             this.$message({
//               message: type === 1 ? '简单' : type === 2 ? '模糊' : '不记得',
//               type: type === 1 ? 'success' : type === 2 ? 'warning' : 'error'
//             })
//             this.getTodayStatics()
//           })
//       }
//
//       eventAdd(event)
//       this.study.index += 1
//       this.showView()
//     },
//
//     showView() {
//       this.show.morphemeAnswer = false
//       this.show.wordAnswer = false
//       this.show.affixAnswer = false
//       this.show.deductAnswer = false
//       const ml = this.todayData.morphemes.length
//       const wl = this.todayData.words.length
//       const al = this.todayData.affixes.length
//       const total = ml + wl
//
//       console.log(al, ml, wl)
//
//       if (al > 0) {
//         this.study.type = 2
//         this.study.affixIndex = this.study.index
//         this.study.affix = this.todayData.affixes[this.study.affixIndex]
//         this.resetAffix(this.study.affix.id)
//         console.log('affix:', this.study.affix)
//       } else {
//         if (this.study.index < ml) {
//           this.study.type = 1
//           this.study.morphemeIndex = this.study.index
//           this.study.morpheme = this.todayData.morphemes[this.study.morphemeIndex]
//           console.log('morpheme:', this.study.morpheme)
//         } else if (this.study.index < total) {
//           this.study.type = 3
//           this.study.wordIndex = this.study.index - ml
//           this.study.word = this.todayData.words[this.study.wordIndex]
//           console.log('word:', this.study.word)
//         } else {
//           console.log('out...')
//           this.show.review = false
//           this.study.index = 0
//           this.study.wordIndex = 0
//           this.study.morphemeIndex = 0
//           this.study.affixIndex = 0
//         }
//       }
//     },
//
//     searchWordByMorphemeId(morphemeId) {
//       this.helper.searchWordByMorphemeId(morphemeId)
//         .then(response => {
//           this.search.word.items = response
//         }).catch(error => {
//         this.$message({
//           message: '查询单词失败: ' + error,
//           type: 'fail'
//         })
//       })
//     },
//
//     handleArrowKey(event) {
//       console.log(event)
//       const meanings = this.pair.word.meanings
//       if (this.show.review) {
//         if (this.study.type === 3) {
//           if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
//             this.speakText(this.study.word.text)
//           } else if (event.key === 'ArrowRight') {
//             this.show.deductAnswer = !this.show.deductAnswer
//           } else if (event.key === 'ArrowLeft') {
//             this.show.wordAnswer = !this.show.wordAnswer
//           }
//         } else if (this.study.type === 1) {
//           if (event.key === 'ArrowLeft') {
//             this.show.morphemeAnswer = !this.show.morphemeAnswer
//           }
//         } else if (this.study.type === 2) {
//           if (event.key === 'ArrowUp') {
//             this.speakText(this.study.affix.text)
//           } else if (event.key === 'ArrowLeft') {
//             this.show.affixAnswer = !this.show.affixAnswer
//           } else if (event.key === 'ArrowRight') {
//             this.getExample(this.study.affix.id)
//           } else if (event.key === 'ArrowDown') {
//             this.speakText(this.study.affixExample.text)
//           }
//         }
//         if (event.key === '1') {
//           this.saveReview(1)
//         } else if (event.key === '2') {
//           this.saveReview(2)
//         } else if (event.key === '3') {
//           this.saveReview(3)
//         }
//       } else {
//         if (event.key === 'ArrowLeft') {
//           if (!this.isFirst) {
//             this.showPrevious()
//           }
//         } else if (event.key === 'ArrowRight') {
//           if (!this.isLast) {
//             this.showNext()
//           }
//         } else if (event.key === 'Enter') {
//           this.speakText(this.pair.word.text)
//         } else if (event.key === 'ArrowUp') {
//           this.mode = this.mode + 1
//         } else if (event.key === 'ArrowDown') {
//           this.mode = this.mode - 1
//         } else if (event.key === '-') {
//           if (meanings.length > 0) {
//             this.speakText(meanings[this.meaningIndex].meaningEnglish)
//             if (this.meaningIndex < meanings.length - 1) {
//               this.meaningIndex += 1
//             } else {
//               this.meaningIndex = 0
//             }
//           }
//         } else if (event.key === '+') {
//           if (meanings.length > 0) {
//             this.speakText(meanings[this.exampleIndex].exampleSentenceEnglish)
//             if (this.exampleIndex < meanings.length - 1) {
//               this.exampleIndex += 1
//             } else {
//               this.exampleIndex = 0
//             }
//           }
//         } else if (event.altKey && event.key === 'n') {
//           this.review()
//         } else if (event.altKey && event.key === 'w') {
//           this.reviewWord()
//         } else if (event.altKey && event.key === 'm') {
//           this.reviewMorpheme()
//         } else if (event.altKey && event.key === 's') {
//           this.search.mode = !this.search.mode
//         } else if (event.altKey && event.key === 'f') {
//           this.reviewAffix()
//         } else {
//           if (parseInt(event.key) !== 'NaN') {
//             const number = parseInt(event.key)
//             this.mode = number
//           }
//         }
//       }
//     }
//   }
// }
