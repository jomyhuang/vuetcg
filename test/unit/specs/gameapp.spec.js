import Vue from 'vue'
import {
  createComponent,
  createVM,
  destroyVM,
  fireEvent
} from '../vm'
import {
  expect
} from 'chai'

import Hello from '@/components/Hello'

import GameApp from '@/components/GameApp'
import testdeck1 from '@/components/decktest1.js'
import testdeck2 from '@/components/decktest2.js'

// 错误： export default {} 不能用解雇式
// import { mutations } from '@/store/mutations'
// 错误：
// import { SET_USER } from '@/store/mutations'
// 正确：
import mutations from '@/store/mutations'
import store from '@/store'
import mutil from '@/mutil'


// 解构出函数
const {
  SET_USER,
  INIT_DB,
  GAME_INIT,
} = mutations

describe('GameAPP', () => {
  let vm
  afterEach(() => {
    if (vm)
      destroyVM(vm)
    vm = null
  })

  it.skip('state test template', () => {
    const state = {
      user: ''
    }
    SET_USER(state, 'jomyhuang')
    expect(state.user).to.equal('jomyhuang')
  })

  it('test run_gameloop one turn', () => {
    vm = createComponent(GameApp, true)
    // vm = createVM(GameApp, true)
    let state = vm.$store.state

    // console.log(vm.$el);
    // createVM how to call?
    // vm.gameReset({decklist:[testdeck1,testdeck2]})
    vm.gameReset()
    vm.run_gameloop(1)
    expect(state.game.turnCount).to.equal(1)
  })

  it('test run_gameloop whole game', () => {
    vm = createComponent(GameApp, true)
    let state = vm.$store.state

    vm.gameReset({decklist:[testdeck1,testdeck2]})
    vm.run_gameloop()
    expect(state.game.over).to.equal(true)
    expect(state.game.turnCount).to.equal(5)
    expect(state.game.score.win).to.equal(state.firstPlayer)
  })

  it('test run_battle', () => {
    vm = createComponent(GameApp, true)
    let state = vm.$store.state

    vm.gameReset()
    vm.gameNewdeck()
    vm.run_battle( {
      attacker: {
        main: mutil.makecard('JW15-001',true),
        support: mutil.makecard('JW15-001'),
      },
      defenser: {
        main: mutil.makecard('JW15-002',true),
        support: mutil.makecard('JW15-002'),
      }
    })


    let battle = state.battle
    expect(state.game.turnCount).to.equal(1)
    // run_battle 没有经过 select, facedown 设定
    expect(battle.attacker.main.play.isAttacker).to.equal(true)
    expect(battle.attacker.main.play.faceup).to.equal(true)
    expect(battle.attacker.support.play.isSupporter).to.equal(true)

    expect(battle.defenser.main.play.isDefenser).to.equal(true)
    expect(battle.defenser.main.play.faceup).to.equal(true)
    expect(battle.defenser.support.play.isSupporter).to.equal(true)

    expect(battle.score.win).to.equal(state.battle.attacker)
    expect(battle.score.lose).to.equal(state.battle.defenser)

  })


})