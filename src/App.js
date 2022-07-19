import React, { useState } from "react";
import { 
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
  Stack,
  Text,
 } from '@chakra-ui/react'
import './App.css';

function InvestmentCalcApp() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [rateOfReturn, setRateOfReturn] = useState(5);
  const [years, setYears] = useState(10);
  const [monthlyAdditions, setMonthlyAdditions] = useState(100);
  const [investmentValue, setInvestmentValue] = useState(32137);

  const InitialInvestmentChange = (event) => {
    let initInvestment = event;
    setInitialInvestment(initInvestment);
  }
  const RateOfReturnChange = (event) => {
    let ror = event;
    setRateOfReturn(ror);
  }
  const YearsChange = (event) => {
    let yrs = event;
    setYears(yrs);
  }
  const MonthlyAdditionsChange = (event) => {
    let monthlyAmt = event;
    setMonthlyAdditions(monthlyAmt);
  }

  const CalculateInvestmentHandler = () => {
    CalculateBasicInvestment();
  }

  const AdditionalPaymentAmount = () => {
    let sumOfOneYear = monthlyAdditions*12;
    let additionalSum = 0;
    for (let i = 0; i < years; i++) {
      additionalSum += sumOfOneYear * Math.pow(((rateOfReturn*0.01)+1) ,(years-i))
      //console.log(`year: ${i} `+sumOfOneYear * Math.pow(((rateOfReturn*0.01)+1) ,(years-i)))
    }
    return additionalSum;
  }

  const CalculateBasicInvestment = () => {
    let sum = Math.round((initialInvestment) * Math.pow(((rateOfReturn*0.01)+1) ,years))+Math.round(AdditionalPaymentAmount());
    setInvestmentValue(sum)
    //console.log('Additional: '+AdditionalPaymentAmount())
  }

  return (
<>
<Container>
  <Center>
<Heading>Investment Calculator</Heading>
</Center>
<FormControl>
  <Stack>
  <Spacer/>
  <FormLabel>Initial Investment (Principal)</FormLabel>
  <NumberInput size='md' maxW={150} defaultValue={10000} min={1} onChange={InitialInvestmentChange}>
  <NumberInputField/>
</NumberInput>
  <FormHelperText>Minimum of $1. No maximum.</FormHelperText>
<Spacer/>
  <FormLabel>Rate of Return</FormLabel>
  <NumberInput size='md' maxW={100} defaultValue={5} min={0} max={100} onChange={RateOfReturnChange}>
  <NumberInputField/>
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
  <FormHelperText>Enter as a number not as a percent.</FormHelperText>
  <Spacer/>
  <FormLabel>Years</FormLabel>
  <NumberInput size='md' maxW={100} defaultValue={10} min={1} max={500} onChange={YearsChange}>
  <NumberInputField/>
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
  <FormHelperText>Minimum 1 year. Max 500 years.</FormHelperText>
  <Spacer/>
  <FormLabel>Monthly Additions</FormLabel>
  <NumberInput size='md' maxW={100} defaultValue={100} min={1} max={10000} onChange={MonthlyAdditionsChange}>
  <NumberInputField/>
</NumberInput>
  <FormHelperText>Funds added on a monthly interval</FormHelperText>
  <Spacer/>
  <Button onClick={CalculateInvestmentHandler} colorScheme='blue'>Calculate Investment</Button>
  <Center>
    <Text fontSize='2xl'>${investmentValue}</Text>
  </Center>
  </Stack>
</FormControl>
</Container>
</>
  );
}

export default InvestmentCalcApp;
