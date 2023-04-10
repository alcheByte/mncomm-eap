<template>
  <div class="rights pad-15">
    <div class="block">
      <div class="title-1">You have certain rights to get help:</div>
      You have the right:
      <ul>
        <li>To apply again if you get denied.</li>
        <li>To apply for more help if you need it.</li>
        <li>To know what the rules are and how we decide what help you get.</li>
        <li>To receive a response within a reasonable time of submitting all information.</li>
        <li>
          To appeal within 30 days after you are sent the results of your application if:
          <ul>
            <li>You receive a denial letter and think we used the wrong information to make the decision.</li>
            <li>You do not receive the help you were promised.</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="block">
      <div class="title-1">You have these responsibilities:</div>
      You must tell us if you or any member of your household:
      <ul>
        <li>Received help with your energy bills earlier this winter.</li>
        <li>Move to a new address (tell us within 30 days of the move).</li>
        <li>Change your fuel dealer or gas or electric companies.</li>
      </ul>
    </div>
    <p class="bold">This program may pay only part of your heating and electric bills. You are responsible to pay the rest.</p>
    <div class="block">
      <div class="title-1">What if you think the information in your file is wrong?</div>
      Talk to your local EAP Service Provider about what you think is wrong in your file.
    </div>
    <div class="block">
      <div class="title-1">What happens if you give false information?</div>
      The local EAP Service Providers or the Minnesota Department of Commerce may check and verify any of the information contained on your application or otherwise provided. You may be denied Energy Program benefits if you provide incomplete or false information. You may be held civilly or criminally liable under federal or state law for knowingly making false or fraudulent statements on your application.
    </div>
    <div class="block">
      <div class="title-1">How to submit a complaint:</div>
      If you think your energy payment was not what it should be or you did not get the services you thought you would, you may contact the local EAP Service Provider listed on the application. If you are not satisfied with their answer, you may write an appeal letter to the local EAP Service Provider. Keep a record of their address and telephone number.
    </div>
    <div class="block">
      <div>If you are not satisfied with their response to your appeal, write to:</div>
      <div class="indent">
        Appeals Officer<br/>
        Energy Assistance Program<br/>
        Minnesota Department of Commerce<br/>
        85 East 7th Place, Suite 280<br/>
        St. Paul, MN 55101-2198<br/>
      </div>
    </div>
    <div class="block">
      If you feel you have been treated differently because of your color, race, national origin, religion, sex, gender, age, marital status, political beliefs, or physical, mental or emotional disability, write to one of the following:
      <div class="row">
        <div class="col-md-1"/>
        <div class="col-md-5">
          Minnesota Department of Human Rights<br/>
          Grigg’s Midway Building<br/>
          540 Fairview Ave. N, Suite 201<br/>
          St. Paul, MN 55104<br/>
          https://mn.gov/mdhr/<br/>
        </div>
        <div class="col-md-1" style="padding-top: 30px;padding-left: 0px;">-OR-</div>
        <div class="col-md-5">
          U.S. Department of Health and Human Services<br/>
          Office for Civil Rights, Region V<br/>
          233 North Michigan Avenue, Suite 1300<br/>
          Chicago, IL 60601<br/>
          www.hhs.gov/ocr/civilrights/complaints<br/>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="title-1">Ask for Assistance:</div>
      <div>If you do not understand the information in this document, call your local EAP Service Provider and ask for assistance. Their telephone number is listed on the first page of the Minnesota Energy Programs Application.</div>
    </div>
    <div class="block">Call the local EAP Service Provider listed on the application to request the application in Spanish. Llame al Proveedor EAP local anotado en la solicitud para pedir una solicitud en español.</div>
  </div>
</template>

<style scoped>
.title-1 {
  text-decoration: underline !important;
  font-weight: bold;
  font-size: larger;
}
.block {
  margin-bottom: 15px;
}
</style>

<script>
export default {
  name: 'Rights',
  data () {
    return {
      loggedIn: false
    }
  }
}
</script>
