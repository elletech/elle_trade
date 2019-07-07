<template>
  <v-app id="app">
    <v-container grid-list-xl>
    <v-layout
      wrap
      justify-space-between
      justify-center
    >
      <v-flex
        xs12
        md4
      >
          <v-form ref="form">
          <v-text-field
            v-model="accountBalance"
            label="口座残高"
            required
            v-money="money"
          ></v-text-field>
          <v-select
            v-model="maxLossPercent"
            :items="maxLossPercents"
            :error-messages="selectErrors"
            label="最大損失パーセント"
            required
          ></v-select>
          <v-select
            v-model="pointer"
            :items="pointers"
            :error-messages="selectErrors"
            label="指標"
            required
          ></v-select>
          <v-select
            v-model="currencyPair"
            :items="currencyPairs"
            :error-messages="selectErrors"
            label="通貨ペア"
            required
          ></v-select>
          <v-select
            v-model="candlestick"
            :items="candlesticks"
            :error-messages="selectErrors"
            label="ローソク足"
            required
          ></v-select>
          <v-select
            v-model="trend"
            :items="trends"
            :error-messages="selectErrors"
            label="トレンド"
            required
          ></v-select>
          <v-select
            v-model="howToTrade"
            :items="howToTrades"
            :error-messages="selectErrors"
            label="取引手法"
            required
          ></v-select>
          <!-- エントリー日付 -->
          <v-dialog
            ref="entryDateDialog"
            v-model="entryDateModal"
            :return-value.sync="entryDate"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="entryDate"
                label="エントリー日付"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="entryDate" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="entryDateModal = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.entryDateDialog.save(entryDate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
          <!-- エントリー時間 -->
          <v-dialog
            ref="entryTimeDialog"
            v-model="entryTimeModal"
            :return-value.sync="entryTime"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="entryTime"
                label="エントリー時間"
                prepend-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="entryTimeModal"
              v-model="entryTime"
              format="24hr"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="entryTimeModal = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.entryTimeDialog.save(entryTime)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
          <!--
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="Do you agree?"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          ></v-checkbox> -->

          <!-- <v-subheader>Tick labels</v-subheader>
          <v-card-text>
            <v-slider
              v-model="fruits"
              :tick-labels="ticksLabels"
              :max="15"
              step="1"
              ticks="always"
              tick-size="2"
            ></v-slider>
          </v-card-text> -->
          <v-btn @click="createTrade">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
      <v-flex
        xs12
        md6
      >
      <!-- <v-slider
          v-model="max"
          label="Max characters"
        >
        </v-slider>

        <v-checkbox
          v-model="allowSpaces"
          label="Allow spaces"
        ></v-checkbox>

        <v-text-field
          v-model="match"
          label="Value must match"
        ></v-text-field> -->
        
      </v-flex>
    </v-layout>
  </v-container>
  </v-app>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import { VMoney } from "v-money"
  // Vue CLIで作成したアプリでは、@マークは./srcを指す
  import firebase from 'firebase';
  import 'firebase/firestore';

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        }
      }
    },

    data: () => ({
      accountBalance: '',
      pointer: 'ボリンジャーバンド',
      currencyPair: 'USD/JPY',
      howToTrade: '順張り',
      candlestick: '15m',
      trend: '',
      entryDate: new Date().toISOString().substr(0, 10),
      entryTime: '',
      entryDateModal: false,
      entryTimeModal: false, 
      maxLossPercent: '2',
      pointers: [
        'ボリンジャーバンド',
        '20日移動平均線'
      ],
      currencyPairs: [
        'USD/JPY',
        'EUR/JPY',
        'EUR/USD'
      ],
      trends: [
        '上昇トレンド',
        '下降トレンド'
      ],
      howToTrades: [
        '順張り',
        '逆張り'
      ],
      candlesticks: [
        '5s',
        '10s',
        '30s',
        '1m',
        '2m',
        '5m',
        '10m',
        '15m',
        '30m',
        '1h',
        '3h',
        '4h',
        '8h',
        'D',
        'W',
        'M'
      ],
      maxLossPercents: [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10'
      ],
      money: {
        decimal: ",",
        prefix: "",
        suffix: " 円 ",
        masked: false, // doesn't work with directive
        allowBlank: true,
        precision: 3,
        // Also bugged that this is not clearable
        // https://github.com/vuejs-tips/v-money/issues/44
      },
      checkbox: false
    }),
    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        //if (!this.$v.select.$dirty) return errors
        //!this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },
    methods: {
      clear () {
        this.$v.$reset()
        this.name = ''
        this.pointer = ''
        this.select = null
        this.checkbox = false
      },
      createTrade(){
        const tradesRef = firebase.firestore().collection("trades"); // "trades"という名前のコレクションへの参照を作成
        //口座残高のカンマと円を取り除く
        const intAccountBalance= this.accountBalance.replace(/[^0-9]/g, '');

        // 保存用JSONデータを作成
        const saveData = {
            userUID: this.$store.getters.user.uid,
            accountBalance: intAccountBalance, //口座残高
            pointer: this.pointer, //指標
            currencyPair: this.currencyPair, //通貨ペア
            candlestick: this.candlestick, //ローソク足
            trend: this.trend, //トレンド
            howToTrade: this.howToTrade, //取引手法
            entryDate: this.entryDate, //エントリー日付
            entryTime: this.entryTime, //エントリー時間
            createdAt: new Date()
        };
        
        // addの引数に保存したいデータを渡す
        tradesRef.add(saveData).then(function(tradesRef) {
              // 正常にデータ保存できた時の処理
              console.log("Document written with ID: ", tradesRef.id);
          }).catch(function(error) {
              // エラー発生時の処理
              console.error("Error adding document: ", error);
          })
      }
    }
  }
</script>