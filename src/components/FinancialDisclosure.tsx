import React from 'react'
import Image from 'next/image'

export default function FinancialDisclosure() {
  return (
    <div className="flex-col justify-between">
        <div className="text-center bg-slate-800 text-slate-300 rounded-md p-6 mt-20 mb-4">
            <p className='text-xs'>
                <strong>NO INVESTMENT ADVICE </strong>

                This website content is for informational purposes only, you should not construe any such information or other material as legal, tax, investment, financial, or other advice. Nothing contained on this site constitutes a solicitation, recommendation, endorsement, or offer to buy or sell any securities or other financial instruments in this or in in any other jurisdiction in which such solicitation or offer would be unlawful under the securities laws of such jurisdiction.

                All Content on this site is information of a general nature and does not address the circumstances of any particular individual or entity. Nothing in the Site constitutes professional and/or financial advice, nor does any information on the Site constitute a comprehensive or complete statement of the matters discussed or the law relating thereto. You alone assume the sole responsibility of evaluating the merits and risks associated with the use of any information or other Content on the Site before making any decisions based on such information or other content. In exchange for using the Site, you agree not to hold this website, its affiliates or any third party service provider liable for any possible claim for damages arising from any decision you make based on information or other content made available to you through the site.

                <strong>INVESTMENT RISKS</strong>

                There are risks associated with investing in securities. Investing in stocks, bonds, exchange traded funds, mutual funds, and money market funds involve risk of loss.  Loss of principal is possible. Some high risk investments may use leverage, which will accentuate gains & losses. Foreign investing involves special risks, including a greater volatility and political, economic and currency risks and differences in accounting methods.  A security’s or a firm’s past investment performance is not a guarantee or predictor of future investment performance.
            </p>
        </div>
        
    </div>
    )
}
