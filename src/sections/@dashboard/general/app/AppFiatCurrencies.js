import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Card, CardHeader, Typography, Stack } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
// _mock_
import { _appInstalled } from '../../../../_mock';
import { PATH_DASHBOARD } from 'src/routes/paths';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { useEffect, useState } from 'react';
// import axios from '../../../../utils/axios';
import axios from 'axios';

// ----------------------------------------------------------------------

const ItemBlockStyle = styled((props) => <Stack direction="row" alignItems="center" {...props} />)({
  minWidth: 72,
  flex: '1 1',
});

const ItemIconStyle = styled(Iconify)(({ theme }) => ({
  width: 16,
  height: 16,
  marginRight: theme.spacing(0.5),
  color: theme.palette.text.disabled,
}));

const FlagIconStyle = styled(Iconify)(({ theme }) => ({
  width: 30,
  height: 30,
  marginRight: theme.spacing(0.5),
  color: theme.palette.text.disabled,
}));

// ----------------------------------------------------------------------

export default function AppFiatCurrencies() {

  const btcPriceTicker = {
    "AUD": {
      "15m": 54989.0,
      "last": 54989.0,
      "buy": 54989.0,
      "sell": 54989.0,
      "symbol": "AUD"
    },
    "BRL": {
      "15m": 204790.34,
      "last": 204790.34,
      "buy": 204790.34,
      "sell": 204790.34,
      "symbol": "BRL"
    },
    "CAD": {
      "15m": 51187.99,
      "last": 51187.99,
      "buy": 51187.99,
      "sell": 51187.99,
      "symbol": "CAD"
    },
    "CHF": {
      "15m": 37955.31,
      "last": 37955.31,
      "buy": 37955.31,
      "sell": 37955.31,
      "symbol": "CHF"
    },
    "CLP": {
      "15m": 3.259759858E7,
      "last": 3.259759858E7,
      "buy": 3.259759858E7,
      "sell": 3.259759858E7,
      "symbol": "CLP"
    },
    "CNY": {
      "15m": 264467.23,
      "last": 264467.23,
      "buy": 264467.23,
      "sell": 264467.23,
      "symbol": "CNY"
    },
    "CZK": {
      "15m": 908717.64,
      "last": 908717.64,
      "buy": 908717.64,
      "sell": 908717.64,
      "symbol": "CZK"
    },
    "DKK": {
      "15m": 297192.45,
      "last": 297192.45,
      "buy": 297192.45,
      "sell": 297192.45,
      "symbol": "DKK"
    },
    "EUR": {
      "15m": 36565.96,
      "last": 36565.96,
      "buy": 36565.96,
      "sell": 36565.96,
      "symbol": "EUR"
    },
    "GBP": {
      "15m": 30773.64,
      "last": 30773.64,
      "buy": 30773.64,
      "sell": 30773.64,
      "symbol": "GBP"
    },
    "HKD": {
      "15m": 315078.08,
      "last": 315078.08,
      "buy": 315078.08,
      "sell": 315078.08,
      "symbol": "HKD"
    },
    "HRK": {
      "15m": 271685.59,
      "last": 271685.59,
      "buy": 271685.59,
      "sell": 271685.59,
      "symbol": "HRK"
    },
    "HUF": {
      "15m": 1.615369522E7,
      "last": 1.615369522E7,
      "buy": 1.615369522E7,
      "sell": 1.615369522E7,
      "symbol": "HUF"
    },
    "INR": {
      "15m": 3127487.45,
      "last": 3127487.45,
      "buy": 3127487.45,
      "sell": 3127487.45,
      "symbol": "INR"
    },
    "ISK": {
      "15m": 5805858.14,
      "last": 5805858.14,
      "buy": 5805858.14,
      "sell": 5805858.14,
      "symbol": "ISK"
    },
    "JPY": {
      "15m": 4812364.48,
      "last": 4812364.48,
      "buy": 4812364.48,
      "sell": 4812364.48,
      "symbol": "JPY"
    },
    "KRW": {
      "15m": 4.966347842E7,
      "last": 4.966347842E7,
      "buy": 4.966347842E7,
      "sell": 4.966347842E7,
      "symbol": "KRW"
    },
    "NZD": {
      "15m": 58914.27,
      "last": 58914.27,
      "buy": 58914.27,
      "sell": 58914.27,
      "symbol": "NZD"
    },
    "PLN": {
      "15m": 171181.87,
      "last": 171181.87,
      "buy": 171181.87,
      "sell": 171181.87,
      "symbol": "PLN"
    },
    "RON": {
      "15m": 185634.87,
      "last": 185634.87,
      "buy": 185634.87,
      "sell": 185634.87,
      "symbol": "RON"
    },
    "RUB": {
      "15m": 4203505.9,
      "last": 4203505.9,
      "buy": 4203505.9,
      "sell": 4203505.9,
      "symbol": "RUB"
    },
    "SEK": {
      "15m": 381693.39,
      "last": 381693.39,
      "buy": 381693.39,
      "sell": 381693.39,
      "symbol": "SEK"
    },
    "SGD": {
      "15m": 55132.65,
      "last": 55132.65,
      "buy": 55132.65,
      "sell": 55132.65,
      "symbol": "SGD"
    },
    "THB": {
      "15m": 1353527.28,
      "last": 1353527.28,
      "buy": 1353527.28,
      "sell": 1353527.28,
      "symbol": "THB"
    },
    "TRY": {
      "15m": 598013.7,
      "last": 598013.7,
      "buy": 598013.7,
      "sell": 598013.7,
      "symbol": "TRY"
    },
    "TWD": {
      "15m": 1020925.79,
      "last": 1020925.79,
      "buy": 1020925.79,
      "sell": 1020925.79,
      "symbol": "TWD"
    },
    "USD": {
      "15m": 40528.89,
      "last": 40528.89,
      "buy": 40528.89,
      "sell": 40528.89,
      "symbol": "USD"
    }
  }

  const [btcPriceData, setBtcPriceData] = useState([])

  useEffect(() => {
    axios
      .get('https://www.blockchain.com/ticker')
      .then((response) => {
        setBtcPriceData((response.data));

        // console.log(response)
        
      })
      .catch((error) => {
        // console.log(error);
        setBtcPriceData(btcPriceTicker)
      });
  }, []);


  return (
    <Card>
      <CardHeader title="Fiat Currencies / Bitcoin" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>

{(btcPriceData && btcPriceData.USD) &&
<>
          <CountryItemTwo key="1" name="United States" flag="emojione-v1:flag-for-united-states" amount={btcPriceData.USD.last} currency="Dollars" symbol={btcPriceData.USD.symbol} />
          <CountryItemTwo key="2" name="United Kingdom" flag="emojione-v1:flag-for-united-kingdom" amount={btcPriceData.GBP.last} currency="Pounds" symbol={btcPriceData.GBP.symbol} />
          <CountryItemTwo key="3" name="Euro" flag="twemoji:flag-european-union" amount={btcPriceData.EUR.last} currency="Euros" symbol={btcPriceData.EUR.symbol} />
          <CountryItemTwo key="4" name="China" flag="emojione-v1:flag-for-china" amount={btcPriceData.CNY.last} currency="Yuan" symbol={btcPriceData.CNY.symbol} />
          <CountryItemTwo key="5" name="Japan" flag="emojione-v1:flag-for-japan" amount={btcPriceData.JPY.last} currency="Yen" symbol={btcPriceData.JPY.symbol} />
</>

}


        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

CountryItem.propTypes = {
  country: PropTypes.shape({
    android: PropTypes.number,
    flag: PropTypes.string,
    name: PropTypes.string,
    windows: PropTypes.number,
  }),
};

function CountryItem({ country }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <ItemBlockStyle sx={{ minWidth: 120 }}>
        <Image disabledEffect alt={country.name} src={country.flag} sx={{ width: 28, mr: 1 }} />
        <Typography variant="subtitle2">{country.name}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={'ant-design:android-filled'} />
        <Typography variant="body2">{fShortenNumber(country.android)}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={'ant-design:windows-filled'} />
        <Typography variant="body2">{fShortenNumber(country.windows)}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle sx={{ minWidth: 88 }}>
        <ItemIconStyle icon={'ant-design:apple-filled'} />
        <Typography variant="body2">{fShortenNumber(country.windows)}</Typography>
      </ItemBlockStyle>
    </Stack>
  );
}

function CountryItemTwo({id, name, flag, amount, currency, symbol}) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <ItemBlockStyle sx={{ minWidth: 120 }}>
        <FlagIconStyle icon={flag} />
        <Typography variant="subtitle2">{name}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={'logos:bitcoin'} />
        <Typography variant="body2">{fShortenNumber(amount)}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={'akar-icons:money'} />
        <Typography variant="body2">{currency}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle sx={{ minWidth: 88 }}>
        <ItemIconStyle icon={'emojione:pound-symbol'} />
        <Typography variant="body2">{symbol}</Typography>
      </ItemBlockStyle>
    </Stack>
  );
}
