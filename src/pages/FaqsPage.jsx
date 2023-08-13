import React, { useState } from "react";
import Layout from "../components/global/Layout";
import CtaSection from "../components/sections/CtaSection";
import { Accordion, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

const flightGeneralInformationData = [
  {
    question: "Forget password?",
    answer:
      'No worries! You can always reset your account password if you forget it. As long as you can provide your email address to us, you can request for "Reset Password"',
  },
  {
    question: "Passport validity less than 6 month?",
    answer:
      "Before traveling to an international trip, make sure your passport has six months validity since it is the general rule for traveling international routes. Most countries will not permit a traveler to enter their country unless the passport has more than six months validity until after the final day of the trip. That means if your passport has less than six months remaining during your trip, you should renew it right away before the departure.",
  },
  {
    question: "When is it safe to fly with my baby?",
    answer:
      "Generally, doctors recommend you not to board until your baby’s immune system is fully developed. One-month-old full-term infants may be allowed to board, though most doctors recommend anywhere between three months and six months. If your baby has heart, lung problems, or any kind of illness which may worsen during the flight, please discuss with your pediatrician before boarding. Each airline has different policies for infants.",
  },
  {
    question: "What is itinertrip Member?",
    answer:
      "If you registered as an itinertrip Member, you will get several benefits. You can manage your orders easier and faster, use the traveler list feature for the fastest booking process, and you will be informed with the lowest fare for any route you desire. Please note: Do not share your itinertrip member account with another person.",
  },
  {
    question: "Passport for overseas transit?",
    answer:
      "Please ensure that your passport has at least six months' validity until after your flight schedule has passed. It is essential to check with the consulates of the country you're planning to visit prior to the departure so that you don't miss any travel documents.",
  },
  {
    question: "Can pregnant women take a flight?",
    answer:
      "If you must take a flight frequently during your pregnancy, your healthcare provider might recommend you to limit your total flight time. Mostly, healthcare providers and many airlines might restrict travel after 36 weeks of pregnancy. If you're experiencing pregnancy complications that could possibly worsen on the airplane or require emergency care, you would likely not be allowed to travel by your healthcare provider.",
  },
];

const flightMyBookingData = [
  {
    question: "How to get or resend my e-ticket/itinerary?",
    answer: `
      To resend your itinerary, please follow the steps below:
      <ol>
        <li>Choose the Orders menu</li>
        <li>Input your itinertrip code and email</li>
        <li>Click Search</li>
        <li>Choose "Resend Itinerary", put your email address then click on "Send"</li>
      </ol>
      For Member, you must login first to Manage your Order.
    `,
  },
  {
    question: "I cannot find my e-ticket",
    answer: `
      You can resend your e-ticket at any time via 'Orders' in our website.
      <ol>
        <li>Visit our website and click on 'Orders', then key in your itinertrip code and your email address (the one you used to make your booking).</li>
        <li>Click on 'Search'</li>
        <li>Go to resend itinerary and key in your email address then click on "Send"</li>
      </ol>
      For Member, you must login first to Manage your Order.
    `,
  },
  {
    question: "What is my booking number?",
    answer: `
      You can find your booking code in the email confirmation that we sent to you. itinertrip provides 2 booking codes in your email, They are itinertrip code and airline booking code.
    `,
  },
  {
    question: "How to input my middle name?",
    answer: `
      Airline will require traveler to fill name and surname similarly as written in their Identity Card or passport.
      If you have a middle name as well, please input your middle name along with your name into one word in the name column because airlines do not permit spaces or punctuation marks in the names.
      Example: Mr. Thomas Alfa Edison
      Title: Mr.
      First Name: ThomasAlfa
      Last Name: Edison
    `,
  },
  {
    question: "What if my name only has one word?",
    answer: `
      Don't worry. If your name contains 1 word only, you can input your name both in the name column and surname column.
      Ex: Kevin, Name "Kevin" and Surname "Kevin"
    `,
  },
  {
    question: "Do I need to add my passport details?",
    answer: `
      Some airlines do not need specific passport information in your flight booking. If they do, it will show up during the booking process and you can see the required passport data in the traveler's information detail.
    `,
  },
  {
    question: "Why there is no e-ticket number?",
    answer: `
      Rest assured! This will not cause any problems for you. Tickets with 'low-cost carriers' (such as AirAsia) do not provide an e-ticket number on the e-ticket. These airlines usually show a barcode instead of a ticket number on the boarding pass. You will receive your boarding pass from the airline after completing your counter check-in.
    `,
  },
  {
    question: "What if my name has more than 40 characters?",
    answer: `
      We apologize for your inconvenience. We can't accept a name with more than 40 characters because the airline system does not accept names with more than 40 characters.
    `,
  },
  {
    question: "How to book?",
    answer: `
      <ol>
        <li>Start searching your flight by filling in your flight detail</li>
        <li>Select the flight that you want with the best price and the most suitable flight schedule</li>
        <li>After you have chosen your flight, you are required to fill in contact information and traveler details</li>
        <li>We have provided various payment methods for you to choose</li>
        <li>After your payment is confirmed, please wait for the confirmation itinerary</li>
      </ol>
    `,
  },
  {
    question: "I missed my flight, what should I do next?",
    answer: `
      We're sorry to hear that you missed your flight. Nevertheless, it is the traveler's own responsibility to be on time for the flight.
      Unfortunately, once ticket status is no-show (a condition when you are unable to take the flight and the flight has already departed), then your ticket will be considered as forfeited.
    `,
  },
];

const paymentStatusData = [
  {
    question: "No confirmation after done payment",
    answer: `
      You will receive your e-ticket as soon as your reservation with the airlines is completed and it will be sent to you via email.
      It is possible that the confirmation email along with your e-ticket and receipt ends up in your spam filter (it is in the spam folder tab in your registered email). Please try to check in there.
    `,
  },
  {
    question: "How to check my payment status?",
    answer: `
      To check your payment status, please manage your booking, please follow the steps below:
      <ol>
        <li>Choose "Orders" menu</li>
        <li>Input your itinertrip code and email</li>
        <li>Click Search</li>
        <li>Scroll down and find your latest Payment Status</li>
      </ol>
      For Member, you must login first to Manage your Order.
    `,
  },
  {
    question: "Payment failed multiple times, what to do?",
    answer: `
      For credit card as your payment method, we suggest you try to use another card.
      After change and still unable to pay by using your card, you may change your payment method to bank transfer or other payment methods available.
      In case you have checked and found a deduction in your account, our team will give you further assistance.
    `,
  },
  {
    question: "What currency is available in itinertrip?",
    answer: `
      There are around 28 currencies and more currencies will be available soon:
      <br>
      1. Arab Emirates Dirham (AED/ د.إ)
      <br>
      2. Australian Dollar (AUD/ $)
      <br>
      3. Bangladeshi Taka (BDT/৳)
      <br>
      4. Brunei Dollar (BND/ B$)
      <br>
      5. Canadian Dollar (CAD/ $)
      <br>
      6. Chinese Yuan (CNY/ ¥)
      <br>
      7. Euro (EUR/ €)
      <br>
      8. British Pound (GBP/ £)
      <br>
      9. Hong Kong Dollar (HKD/ $)
      <br>
      10. Indonesian Rupiah (IDR/ Rp)
      <br>
      11. Indian Rupee (INR/ ₹)
      <br>
      12. Japanese Yen (JPY/ ¥‎)
      <br>
      13. Cambodian Riel (KHR/ ៛‎)
      <br>
      14. Korean Won (KRW/ ₩)
      <br>
      15. Laostian Kip (LAK/ ₭)
      <br>
      16. Sri Lankan Rupee (LKR/ Rs)
      <br>
      17. Burmese Kyat (MMK/ K)
      <br>
      18. Macau Pataca (MOP/ MOP$)
      <br>
      19. Malaysian Ringgit (MYR/ RM)
      <br>
      20. New Zealand Dollar (NZD/ $)
      <br>
      21. Philippine Peso (PHP/ ₱)
      <br>
      22. Russian Ruble (RUB/ ₱)
      <br>
      23. Saudi Arabian Riyal (SAR/ ﷼‎)
      <br>
      24. Singapore Dollar (SGD/ $)
      <br>
      25. Thailand Baht (THB/ ฿)
      <br>
      26. Taiwan Dollar (TWD/ NT$)
      <br>
      27. United States Dollar (USD/ $)
      <br>
      28. Vietnam Dong (VND/ ₫)
    `,
  },
  {
    question: "What payment methods are available at itinertrip?",
    answer: `
      There are 10 payment methods that you can choose to complete your payment on itinertrip site, such as:
      <ul>
        <li>Credit card</li>
        <li>Bank Transfer</li>
        <li>Debit Card</li>
        <li>Over The Counter</li>
        <li>E wallet</li>
        <li>Internet Banking</li>
        <li>ATM</li>
        <li>QR Pay</li>
        <li>Pay At Hotel</li>
        <li>Pay Later</li>
      </ul>
    `,
  },
  {
    question: "How to get tax invoices for my booking?",
    answer: `
      If you already get a booking itinerary/ticket, it means that you have also received the payment receipt from us.
      The payment receipt is always sent along with the ticket and email confirmation. This payment receipt shows the full amount paid and it is only in the form of an invoice.
      You can get your payment receipt by resending your confirmation email to your email any time via "Orders" in our website.
    `,
  },
  {
    question: "Payment status failed, but money already deducted",
    answer: `
      Please double-check your transaction receipt or payment slip and check your bank statement whether it is already deducted or not.
      Please contact your bank to double confirm. If it's confirmed that your payment is already deducted to itinertrip successfully,
      your payment and will inform you back as soon as possible.
      Once we receive your form, our team will help you to check your payment and inform you back. Most of the time we will need your payment receipt.
      *Remember always save your payment receipt.
    `,
  },
];
const flightChangeData = [
  {
    question: "Can I change my flight?",
    answer: `
      Every ticket has its own conditions, especially when it comes to changing a flight date. You can find the exact conditions for your flight when you search your flight. If there is a word "Reschedule" stated in the flight detail, it means you are able to change your flight. Please note, it is also possible that your ticket is not allowed to be changed.

      You can send us a request to change your flight date/reschedule through the 'Change Flight’ menu in 'Orders' on our website. Here are the detailed instructions for a change flight/reschedule request:
      <ol>
        <li>Visit our website and click on 'Orders', then input your itinertrip code and your email address (the one you used to make your booking).</li>
        <li>Click on 'Search'</li>
        <li>Choose the option 'Change flight' and follow the steps.</li>
      </ol>
      For members, you must log in first to manage your booking:
      <ol>
        <li>Visit our website, log in and click on 'Order', then input your itinertrip code.</li>
        <li>Click on 'Search'</li>
        <li>Choose the option 'Change flight' and follow the steps.</li>
      </ol>
    `,
  },
  {
    question: "How to check my refund status?",
    answer: `
      To check your refund status, you can simply go to the 'Orders' menu, then fill in your itinertrip code and your registered email. If you requested a refund, the status will be displayed there.

      If you have registered and have an itinertrip account before, please log in to your itinertrip account first before going to the 'Orders' menu.
    `,
  },
  {
    question: "How do I correct my traveler data?",
    answer: `
      Please send us a correction name request through our form and make sure you select 'Change Traveler Data' in the 'Orders' menu on our website. Here are the instructions:
      <ol>
        <li>Visit our website and click on 'Orders', then input your itinertrip code and your email address (the one you used to make your booking).</li>
        <li>Click on 'Search'</li>
        <li>Choose the option 'Change Traveler Data' and follow the steps.</li>
      </ol>
      If you are a member, you must log in first in order to manage your booking:
      <ol>
        <li>Visit our website, log in and click on 'Orders' with your itinertrip code.</li>
        <li>Click on 'Search'</li>
        <li>Choose the option 'Change Traveler Data' and follow the steps.</li>
      </ol>
      *Please notice: Changing a flight ticket usually requires additional costs, even if you just need to correct a small spelling mistake for your name.
    `,
  },
  {
    question: "I cannot use my voucher",
    answer: `
      If your voucher code isn't working or if you don't see the field to verify your voucher, then you need to make sure your booking meets all the following conditions:
      - Voucher must be applied using the same currency as your original booking.
      - Check if all spaces are deleted at the beginning and at the end of the code.
      - Check if you have mistaken 0 (the number) with O (the letter).
      - Check the validity of the code. A voucher code is valid for 1 year from the date you received the voucher email.
      - The voucher from flight booking is valid for flights only.
      - Enter the code on the payment page by clicking on 'Verify' to apply the voucher code.

      A voucher code is valid for 1 year starting from the date when you received the voucher email. Once the validity has expired, you can't redeem it anymore.
    `,
  },
  {
    question: "How much will it cost to change my flight?",
    answer: `
      Every ticket has its own conditions when it comes to changing a flight date. You can find the conditions for your flight by managing your booking or in your booking itinerary email. It is also possible that your ticket cannot be changed. Please note, all change flight costs will follow airlines' rules (including the change and service fee), and the cost of each airline will not be the same. If you proceed to change, we consider you fully aware and AGREE with the conditions.
    `,
  },
  {
    question: "Can I transfer my ticket to someone else?",
    answer: `
      Unfortunately, no airlines allow this request, even for any reason. An e-ticket is non-transferable; it is personal.
    `,
  },
  {
    question: "Can I change the route? (wrong route)",
    answer: `
      In case you need to change your flight route, you need to make sure that your flight is eligible for rerouting. Please refer to the Terms & Conditions for each airline for the rerouting option. If the option for rerouting is available, go to "Orders" on our website to manage your booking and choose the changes you desire. You only need to cover the difference in price and the corresponding fee for the changes. However, if your flight time is near, usually you cannot make the changes anymore, and if you have already done online check-in before, no rerouting is allowed.
    `,
  },
  {
    question: "Can I cancel my ticket or one of the traveler's tickets?",
    answer: `
      Every ticket has its own conditions when it comes to cancellation. You can find the exact conditions for your flight in your flight booking itinerary email. Please note: It is also possible that your ticket cannot be cancelled. In that case, you will not receive any refund.

      If you're sure you want to cancel your ticket, please send us a cancellation request in the 'Cancellation' option in the 'Orders' menu on our website. Then, please follow the instructions below:
      <ol>
        <li>Visit our website and click on 'Orders', then input your itinertrip code and your email address (the one you used to make your booking).</li>
        <li>Click on 'Search'</li>
        <li>Choose the option 'Cancellation' and fill in the form.</li>
      </ol>
      If you are a member, then you must log in first in order to manage your booking:
      <ol>
        <li>Visit our website, log in and click on 'Orders' with your itinertrip code.</li>
        <li>Click on 'Search'</li>
        <li>Choose the option 'Cancellation' and fill in the form.</li>
      </ol>
      *Please note: This is only a cancellation request; your booking is not cancelled yet!
    `,
  },
  {
    question: "My ticket was changed or cancelled by the airline?",
    answer: `Schedule changes are always made by the airline, not by us. The airline is responsible for the
    transport of travelers to the destination which was originally purchased by
    them.&nbsp;<br>However, airlines have the right to make changes to the flight schedule any
    time.&nbsp;<br><br>Minor schedule change:&nbsp;<br>You will receive an email from us regarding
    the schedule change. A minor change on your schedule doesn't require any action. You can use
    your original e-ticket to travel. You don't need to confirm the schedule change to
    us.&nbsp;<br><br>Major schedule change:&nbsp;<br>In this case, you will also receive email from
    us regarding updates on your flight schedule. When a major change on your schedule is made, the
    airline will need your confirmation and you can contact the airline through the help or support
    page in their website to confirm.&nbsp;<br><br>We strongly recommend you to be at the airport at
    least 3 hours in advance to do counter check-in or check-in online days prior to your departure
    date (Check-in online may not be available for some airlines).&nbsp;<br>Reschedule/Change/Cancel
    by the airline may also occur even after online check-in.`,
  },
];

const checkInData = [
  {
    question: "When and how to check-in online",
    answer: `
      The accessible time for check-in online varies per airline. Most airlines allow check-in online 24 hours prior to departure. You can do online check-in at the airline website directly using the PNR Code and other required details from your e-ticket in your email.
    `,
  },
  {
    question: "I cannot check-in online",
    answer: `
      In case online check-in doesn't work, please double-check the requirements below to complete your online check-in:
      <ul>
        <li>Is the online check-in already available? For most airlines, online check-in will be available 24-48 hours prior to departure.</li>
        <li>Are you using the correct data to check-in? Please double-check the departure city, PNR, and your surname.</li>
      </ul>
      *Please note: Check-in online may not be available for some airlines.
    `,
  },
  {
    question:
      "Do I need to print my e-ticket or can I show my phone during check-in?",
    answer: `If you don't want to print your e-ticket, you can show your PNR Code on your phone when you do the check-in at the airport.`,
  },
  {
    question: "How to get a boarding pass?",
    answer: `You can get a boarding pass when you do the check-in at the airport. Please provide your booking code when you do the check-in at the airline counter in the airport.`,
  },
  {
    question: "When should I arrive at the airport?",
    answer: `We suggest you arrive at the airport at least 2 hours before your departure time to avoid late check-in.`,
  },
  {
    question: "Is it possible to cancel or reschedule after check-in?",
    answer: `You are not allowed to make any changes if you have already checked-in at the airport or on the website.`,
  },
  {
    question: "Is it possible to purchase add-ons during check-in?",
    answer: `Most airlines provide a web check-in feature for their bookings. You can purchase add-ons when you do the web check-in.`,
  },
  {
    question: "What is my seat number?",
    answer: `
      The seat is automatically reserved for you by the airline. You can see this on your boarding pass. You will receive your boarding pass from the airline after completing your counter check-in or (online) check-in. Check-in online may not be available for some airlines.
    `,
  },
];

const baggageData = [
  {
    question: "I want to add excess baggage",
    answer: `
      For adding baggage, you can simply go to the 'Orders' menu on our website/apps.
      Here are the detailed instructions for adding baggage:
      1. Visit our website and click on 'Orders', then input your itinertrip code and your email address (the one you used to make your booking).
      2. Click on 'Search'.
      3. Choose the option 'Add baggage' and follow the steps.
      
      For members, you must log in first in order to manage your booking:
      1. Visit our website, login, and click on 'Order', then input your itinertrip code.
      2. Click on 'Search'.
      3. Choose the option 'Add baggage' and follow the steps.
    `,
  },
  {
    question: "How if I have sport equipment for my luggage?",
    answer: `
      Most sports equipment is prohibited in the cabin and must be inside your checked baggage. Make sure to buy extra baggage capacity to carry your sport equipment. Some airlines will have an extra handling fee for sport equipment, most of which can be added via online check-in.
    `,
  },
  {
    question: "How many kg allowance for my baggage?",
    answer: `
      If you haven't booked yet and want to know how much baggage you can bring, you can view the checked baggage allowance when you search your flight. Please pay attention to the baggage symbol. If you don't see the baggage symbol, it means you need to buy baggage for your flight (no free baggage provided). You can check the minimum and maximum quantity of the additional baggage allowance during the booking process. Please see the traveler data information page during the booking process, and you will find the baggage option.
      
      If you have already booked your flight and want to check the baggage information, please check it in the 'Orders'. The quantity of baggage that you can take with you will be different for each airline. Hand (cabin) baggage is normally allowed up to a maximum of 7 kg per person/traveler.
    `,
  },
  {
    question: "Can I take my pet on the flight?",
    answer: `
      If you want to take your dog, cat, or another kind of pet traveling with you, you have to contact the airlines directly and use your PNR code number to arrange it with the airlines.
    `,
  },
];

const specialRequestnData = [
  {
    question: "How can I reserve a seat?",
    answer: `
      You can arrange your seat's number by contacting the airlines. Please use your PNR number (listed on your e-ticket) to reserve your seat with the airlines.
      *Please notice:
      Some airlines will charge a fee for the seat reservation.
      It may also be that you can only reserve a seat during counter check-in.
    `,
  },
  {
    question: "How can I reserve a meal?",
    answer: `
      You can select your preferred meal at the airline's website by using online check-in or contacting the airlines directly. Please note that most airlines charge a fee for meal selection. Check-in online may not be available for some airlines.
    `,
  },
  {
    question:
      "I need to add my wheelchair and another special request, how can I arrange this?",
    answer: `
      You can get wheelchair assistance and other special requests by contacting the airlines directly. Use your PNR code number to arrange it with the airlines.
    `,
  },
];

// hotel data

const hotelGeneralInformationData = [
  {
    question:
      "Is there an additional charge for children when sharing a room with their parent's?",
    answer:
      "When your kids share a room without extra beds, there will be no charges.",
  },
  {
    question: "Does the hotel allow pets?",
    answer:
      "If you travel with your pet, make sure to check first whether the property allows pets inside. You can find it in the property's policy.",
  },
  {
    question: "Where can I find the hotel contact number and address?",
    answer: `<div class="faq__content">
      <p>You can see your booking hotel contact number and address any time via 'Orders’ in our website.
      </p>
      <ol>
          <li>Visit our website and click on 'Orders’ , then key in&nbsp;your itinertrip code and your
              email
              address (the one you used to make your booking).</li>
          <li>Click on ‘Search’</li>
          <li>Go to Property Detail section</li>
      </ol>
      <p>For Member, you must login first to Manage your Order.</p>
  </div>`,
  },
];

const hotelSearchData = [
  {
    question: "How to know which hotel has free cancellation?",
    answer:
      "You can find it at the room detail section after you choose the hotel. The information of the payment method option and breakfast facility can also be seen in the room detail section.",
  },
  {
    question: "How to know if my booking included breakfast?",
    answer:
      "It depends on the hotel and the room type. You can see if it is included by checking the text below the room name. If it is not included, you can roll your cursor over the text in the column called 'Conditions' to find out if it is available and if there are any additional costs. However, if your booking does not include breakfast, but you would like to have breakfast, you can request it during check-in and make the payment directly to the hotel. This information will also be stated in your confirmation email.",
  },
  {
    question: "How to find the best hotel I desire?",
    answer:
      "Just simply type in the hotel name, location, or city to look for the availability of the hotel. Remember to use the filter or sort function to narrow down the options based on what you desire.",
  },
];

const hotelBookData = [
  {
    question: "How to resend itinerary and voucher?",
    answer: `<div class="faq__content">
     <p>To resend your itinerary, please follow the steps below :</p>
     <ol>
         <li>Choose "Orders" menu</li>
         <li>Input your itinertrip code and email</li>
         <li>Click Search</li>
         <li>Choose "Resend Itinerary", put your email address then click on "Send"</li>
     </ol>
     <p>For Member, you must login first to Manage your Order.</p>
 </div>`,
  },
  {
    question: "How to book?",
    answer: `<div class="faq__content">
    <ol>
        <li>Start searching your hotel by filling in your nearby location area or destination property
            name also your check-in date then total desired&nbsp;Room &amp; Guest&nbsp;</li>
        <li>Select the property then choose room&nbsp;that you want to stay with the best price and the
            most suitable staying schedule</li>
        <li>Click Reserve after you have chosen your room, you are required to fill in contact
            information and Guest details</li>
        <li>We have provided various payment method for you to choose.</li>
        <li>After your payment is confirmed, Please wait for the confirmation Hotel voucher</li>
    </ol>
</div>`,
  },
  {
    question: "When and how I receive hotel voucher?",
    answer:
      "You will get your hotel voucher after you finished the booking process. The hotel voucher can be found in your email. Therefore, we highly recommend you to check your email inbox. Once you have made a successful payment for your booking, we will send you the hotel voucher to your email. Make sure to check your email spam folder if you still do not receive any confirmation from us or you can just simply login to your itinertrip account or manage booking to retrieve your hotel voucher.",
  },
  {
    question: "How to check my hotel booking status?",
    answer: `<div class="faq__content">
   <p>To check your booking status, please manage your booking,&nbsp;please follow the steps below :
   </p>
   <ol>
       <li>Choose "Orders" menu</li>
       <li>Input your itinertrip code and email</li>
       <li>Click Search</li>
       <li>Find your latest Booking Status in Order Details</li>
   </ol>
   <p>For Member, you must login first to Manage your Order.</p>
</div>`,
  },
  {
    question: "Choosing different room type in one booking?",
    answer:
      "In itinertrip, it's easy to book your room even with different types. Just simply add up the number of rooms for each room type and submit when you're done. Then, your rooms will be in one booking.",
  },
];

const hotelPaymentInvoice = [
  {
    question: "No confirmation after done payment",
    answer:
      "Please make sure to check your email for the confirmation or check the spam mail folder. In case you cannot find any email confirmation for your booking, just resend your itinerary to your email. Simply go to 'Orders' to check your booking status by filling up your itinertrip Code and email address. For Member account, please log in to your account first before going to 'Orders'.",
  },
  {
    question: "Why I need to provide my card details?",
    answer:
      "When you make a booking at itinertrip, there will be various payment methods available. If you choose Pay Now for your booking, the full cost of your stay will be charged to your credit card as soon as the booking is completed. Thus, you do not need to pay anymore upon your arrival at the hotel. If you choose Pay at Hotel, your credit card details may be required to guarantee your booking. In case you don't show up, the hotel will charge your credit card.",
  },
  {
    question: "How to get tax invoices for my hotel booking?",
    answer:
      "You will find it in your hotel voucher/itinerary email. Therefore, you must check the email confirmation and your hotel voucher as it's already included there. This is the only invoice/receipt from itinertrip.",
  },
  {
    question: "What currency will I be charged if I book an overseas hotel?",
    answer:
      "In itinertrip, you can choose to pay in the currency you want to be charged to your credit card/account payment/payment type you use. In order to do that, you can simply change the currency from the main menu. (Currently, we have 28 currencies that you can choose.)",
  },
];

const hotelRefundCancellationChange = [
  {
    question: "Is there any fee for cancelling my hotel booking?",
    answer:
      "The cancellation request will depend on the hotel's policy and there might be a cancellation fee required. Please contact the hotel for further information.",
  },
  {
    question: "How much amount I'll get for my refund?",
    answer:
      "The refund amount of cancellation will vary per hotel which is based on the hotel’s policy. There might be a cancellation fee for each cancellation request.",
  },
  {
    question: "Can I reschedule my hotel booking?",
    answer:
      "You can make the reschedule request by submitting a form. Once our team responds to your form, we will inform you back via email.\n\n*Please notice:\nThis request might depend on the room's availability and the hotel’s policy.",
  },
];

const hotelReviewRating = [
  {
    question: "How can I give the review?",
    answer:
      "We will send you an email for hotel review right after you check-in to the hotel. Please follow the instructions given in the email.",
  },
  {
    question: "Can I write a review about a hotel I'm staying in?",
    answer:
      "Yes, you are definitely allowed to write a review only if you book the hotel from itinertrip and have been checked-in to the hotel recently. Every guest who stayed in the hotel and booked it using itinertrip is allowed to give a hotel review.",
  },
];

const renderAnswer = (answer) => {
  return (
    <div
      className="faq__content"
      dangerouslySetInnerHTML={{ __html: answer }}
    />
  );
};

const FaqsPage = () => {
  const [activeTab, setActiveTab] = useState("General Information");

  const flightTabData = [
    { title: "General Information", tabMap: flightGeneralInformationData },
    { title: "My Booking", tabMap: flightMyBookingData },
    { title: "Payment and Invoice", tabMap: paymentStatusData },
    { title: "Refund, Cancellation, Change", tabMap: flightChangeData },
    { title: "Check-in Information", tabMap: checkInData },
    { title: "Baggage", tabMap: baggageData },
    { title: "Special Request", tabMap: specialRequestnData },
  ];

  const hotelTabData = [
    {
      title: "General Information",
      tabMap: hotelGeneralInformationData,
    },
    {
      title: "Hotel Search",
      tabMap: hotelSearchData,
    },
    {
      title: "Hotel Book",
      tabMap: hotelBookData,
    },
    {
      title: "Payment and Invoice",
      tabMap: hotelPaymentInvoice,
    },
    {
      title: "Refund, Cancellation, Change",
      tabMap: hotelRefundCancellationChange,
    },
    {
      title: "Review and Rating",
      tabMap: hotelReviewRating,
    },
  ];

  const handleTabClick = (title) => {
    setActiveTab(title);
  };

  return (
    <Layout>
      {/* Common Banner Area */}
      <section className="mt-4 mt-md-5 pt-md-5 pt-xl-0">
        <div className="container">
          <div className="d-flex flex-column justify-content-center">
            <h1 className="display-4 fw-bold">Frequently Asked Questions</h1>
            <h4 className="mb-0 fw-normal">How can we help you?</h4>
          </div>
        </div>
      </section>
      {/* Faqs Area */}
      <section id="faqs_main_arae" className="py-5">
        <div className="container">
          <Tab.Container defaultActiveKey="flight">
            <Nav variant="pills" className="gap-3 pb-4">
              <Nav.Item>
                <Nav.Link eventKey="flight">Flight</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="hotel">Hotel</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="flight">
                <div className="row">
                  <div className="col-12 col-md-4 col-xl-3 mb-4 mb-md-0 d-none d-lg-block">
                    <div
                      className="navtabs__menu sticky-top"
                      style={{ top: 90 }}
                    >
                      {flightTabData.map((tab, index) => (
                        <Link
                          key={`flight-tab-${index}`}
                          className={`faq__link navtab__link js-tabs-link ${
                            activeTab === tab.title ? "active" : ""
                          }`}
                          to
                          onClick={() => handleTabClick(tab.title)}
                        >
                          {tab.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col">
                    {flightTabData.map((tab, index) => (
                      <>
                        {activeTab === tab.title && (
                          <Accordion key={`flight-accordion-${index}`}>
                            {tab.tabMap.map((faq, index) => (
                              <Accordion.Item
                                eventKey={index.toString()}
                                key={index}
                              >
                                <Accordion.Header>
                                  {faq.question}
                                </Accordion.Header>
                                <Accordion.Body>
                                  {renderAnswer(faq.answer)}
                                </Accordion.Body>
                              </Accordion.Item>
                            ))}
                          </Accordion>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="hotel">
                <div className="row">
                  <div className="col-12 col-md-4 col-xl-3 mb-4 mb-md-0 d-none d-lg-block">
                    <div
                      className="navtabs__menu sticky-top"
                      style={{ top: 90 }}
                    >
                      {hotelTabData.map((tab, index) => (
                        <Link
                          key={`hotel-tab-${index}`}
                          className={`faq__link navtab__link js-tabs-link ${
                            activeTab === tab.title ? "active" : ""
                          }`}
                          to
                          onClick={() => handleTabClick(tab.title)}
                        >
                          {tab.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col">
                    {hotelTabData.map((tab, index) => (
                      <>
                        {activeTab === tab.title && (
                          <Accordion key={`hotel-accordion-${index}`}>
                            {tab.tabMap.map((faq, index) => (
                              <Accordion.Item
                                eventKey={index.toString()}
                                key={index}
                              >
                                <Accordion.Header>
                                  {faq.question}
                                </Accordion.Header>
                                <Accordion.Body>
                                  {renderAnswer(faq.answer)}
                                </Accordion.Body>
                              </Accordion.Item>
                            ))}
                          </Accordion>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </section>
      <CtaSection />
    </Layout>
  );
};

export default FaqsPage;
