import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',    // define o valor inicial do display como 0
    clearDisplay: false,  // se precisa ou não limpar o valor no display
    operation: null,     // variavel para armazenar as operações matemáticas
    values: [0, 0],      // array com 2 valores
    current: 0          // diz se estou manipulando o valor de indice 0 ou 1 desse array (values)
}

export default class Calculator extends Component {

    state = { ...initialState }   // starta o estado 

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState }) // volta para o estado inicial do objeto
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({operation, current: 1, clearDisplay: true}) //seta o valor que digitar após clicar em um simbolo de operação para o indice 1
        } else {
            const result = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            switch(currentOperation){
                case '+':
                    values[0] = values[0] + values[1]
                    break
                case '-':
                    values[0] = values[0] - values[1]
                    break
                case '*':
                    values[0] = values[0] * values[1]
                    break
                case '/':
                    values[0] =values[0] / values[1]
                    break
                default:
                    values[0] = this.state.values[0]
            }
            /*
            ------ outro jeito de fazer, usando eval. Porém pode ocorrer warnings! ------
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) //pode ser substituído por if/switch . eval faz o calculo.
            } catch(e) {
                values[0] = this.state.values[0]
            }
            */
            
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: result ? null : operation,
                current: result ? 0 : 1,
                clearDisplay: !result,
                values
            })
        }

    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        } // se já existir um '.', nao adicione um segundo.

        const clearDisplay = this.state.displayValue === '0' 
            || this.state.clearDisplay   //se ele só conter o dig '0', limpe o display e substitua pelo digito clicado.

        const currentValue = clearDisplay ? '' : this.state.displayValue // se o display for limpado, sete como vazio, se não, sete o valor clicado no display
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current //armazena o indice do elemento atual
            const newValue = parseFloat(displayValue) // converto para float
            const values = [...this.state.values] //faço um clone desse array
            values[i] = newValue // altera o valor atual
            this.setState({ values }) // substituí os valores na const initialState
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}