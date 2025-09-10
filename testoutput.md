ERROR in src/components/SimplePayment.tsx:206:13
TS2554: Expected 2 arguments, but got 1.
    204 |             window.location.href = 'mailto:PragmaDAO@proton.me?subject=Enterprise%20Plan%20Inquiry';
    205 |           } else {
  > 206 |             handlePayment(plan);
        |             ^^^^^^^^^^^^^^^^^^^
    207 |           }
    208 |         }}
    209 |         disabled={paymentStatus === 'processing' && !plan.isContactUs}