'use client';
import "@styles/globals.css";

import { Nav } from "@components/Nav";

import { Provider } from "@components/Provider";
import{ motion } from "framer-motion";
import { ThemeProvider } from "next-themes";


const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <motion.body>
        <ThemeProvider enableSystem={false} attribute="class">
          <Provider>
            <div className='main'>
              <div className='gradient' />
            </div>

            <main className='app'>
              <Nav />
              {children}
            </main>
          </Provider>
        </ThemeProvider>
      </motion.body>
    </html>
  );
};

export default RootLayout;
