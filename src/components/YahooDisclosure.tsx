import React from 'react'
import Image from 'next/image'

export default function YahooDisclosure() {
  return (
    <div className="flex-col justify-between">
        <div className="text-center bg-slate-800 text-slate-300 rounded-md p-6 mb-4">
            <p className='text-sm'>
                Nothing on this website should be considered financial advice. Please consult a financial advisor for investment related questions.
            </p>
            <p className='text-sm text-center font-bold'>Data provided by <a href="https://legal.yahoo.com/us/en/yahoo/terms/product-atos/apiforydn/index.html">yahoo! Finance API, and </a><a href="https://finance.yahoo.com">yahoo! Finance</a></p>
            <p className='mt-2'><a href="https://www.yahoo.com/?ilc=401" target="_blank"> <img className='mx-auto' src="https://poweredby.yahoo.com/poweredby_yahoo_h_purple.png" width="134" height="20" alt='yahooFinance'/></a></p>

        </div>

        <div className="text-center bg-slate-800 text-slate-300 rounded-md p-6 mb-12">
                <p className='font-bold text-sm'>
                    yahoo! Finance API Disclosure
                </p>
                <p className='text-xs'>
                    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS &#34;AS IS&#34; AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                </p>
        </div>
        
    </div>
    )
}