import axios, { AxiosResponse } from 'axios';
import Account from '../domain/Account';
import NewAccount from '../domain/AccountNew';

const apiKey = "http://localhost:3000/accounts"

class HttpAccounts {
    static getAccounts = async (): Promise<Account[]> => {
        console.log(apiKey)
        try {
          if (!apiKey) {
            throw new Error('API key is missing');
          }
    
          const response: AxiosResponse = await axios.get(apiKey);
    
          if (response.status !== 200) {
            throw new Error('Failed to fetch accounts');
          }
    
          const accountsData: any[] = response.data;
    
          const accounts: Account[] = accountsData.map((data: any) => ({
            id: data.id,
            name: data.name,
            account_name: data.account_name,
            email: data.email,
            status: data.status,
            start_date: data.start_date,
            expiration_date: data.expiration_date,
          }));
    
          return accounts;
        } catch (error) {
          console.log('Error fetching accounts:', error);
          throw error;
        }
      };

      static removeAccount = async (id: number) => {
          try{
            const response: AxiosResponse = await axios.delete(`${apiKey}/${id}`);
            
            if (response.status !== 200) {
              throw new Error('Failed to fetch accounts');
            }

          }catch(e){
            console.log('Error fetching accounts:', e);
            throw e;
          }
      }

     static editAccount = async (account: Account) => {
        try{
          const response: AxiosResponse = await axios.patch(`${apiKey}/${account.id}`, {
            name: account.name,
            account_name: account.account_name,
            status: account.status,
            start_date: account.start_date,
            expiration_date: account.expiration_date,
            email: account.email
          });

        }catch(e){
          console.log('Error fetching accounts:', e);
          throw e;
        }
     } 

     static getAccount = async (id: number): Promise<Account>=> {
      try{
        const response: AxiosResponse = await axios.get(`${apiKey}/${id}`)

        if (response.status !== 200) {
          throw new Error('Failed to fetch accounts');
        }
        const accountData = response.data

        const account: Account = {
          id: accountData.id,
          name: accountData.name,
          account_name: accountData.account_name,
          status: accountData.status,
          email: accountData.email,
          start_date: accountData.start_date,
          expiration_date: accountData.expiration_date
        }

        return account;
      }catch(e){
        console.log('Error fetching accounts:', e);
        throw e;
      }
     }

      static newAccount = async (account: NewAccount) => {
        try{
            const response: AxiosResponse = await axios.post(`${apiKey}`, {
              name: account.name,
              account_name: account.account_name,
              status: account.status,
              start_date: account.start_date,
              expiration_date: account.expiration_date,
              email: account.email
            });

            if (response.status !== 200) {
              throw new Error('Failed to fetch accounts');
            }
        }catch(e){
            console.log('Error fetching accounts:', e);
            throw e;
        }
      }
}


export default HttpAccounts