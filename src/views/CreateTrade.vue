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
          <!-- <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-select
            v-model="select"
            :items="items"
            :error-messages="selectErrors"
            label="Item"
            required
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
          ></v-select>
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="Do you agree?"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          ></v-checkbox> -->
        
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
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
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
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
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
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
      createTrade(){
        const tradesRef = firebase.firestore().collection("trades"); // "trades"という名前のコレクションへの参照を作成
        //口座残高のカンマと円を取り除く
        const intAccountBalance= this.accountBalance.replace(/[^0-9]/g, '');

        // 保存用JSONデータを作成
        const saveData = {
            accountBalance: intAccountBalance,
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