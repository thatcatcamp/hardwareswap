<script>
  let faqs = [
    {
      question: "Who are you people?",
      answer: "We are a nonprofit that provides tech support and hardware resources for artists and educators.  We are the backing organization for a medium sized Burning Man camp."
    },
    {
      question: "Is this really free?",
      answer: "Yup - although the donor may not want to cover shipping to your location if it's very expensive.  Everything here is completely free as in beer."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Depends on the donor - because of customs often international shipping might be more expensive than just buying locally though.  Contact the donor and ask."
    },
    {
      question: "I'm a teacher, and I really need a laptop for work - can I have one.",
      answer: "Absolutely - if you don't have an .edu address we might want to see your ID though."
    },
    {
      question: "I'm a student, and I really need a tablet for school.  Can I have one?",
      answer: "Yup - just like a teacher, if you don't have a .edu email, we'll need at least a picture or your ID and permission from a parent."
    },
    {
      question: "I'm building art and I'm really stuck on X?  Can you help me?",
      answer: "Probably - send an email and we'll try.  :)"
    },
    {
      question: "I want to donate stuff!",
      answer: "Awesome!  If you are close to one of us (Houston Texas area) you can drop it off or we'll pick it up.  Otherwise we'll have to arrange shipping to us or the end user."
    }
  ];

  function toggleFaq(index) {
    faqs = faqs.map((faq, i) => {
      if (i === index) {
        return { ...faq, isOpen: !faq.isOpen };
      }
      return faq;
    });
  }
</script>

<div class="container my-5">
  <!-- Top-level section -->
  <section class="text-center mb-5">
    <h1 class="display-4">Frequently Asked Questions</h1>
    <p class="lead">Find answers to our most commonly asked questions below. If you can't find what you're looking for, please contact our support team.</p>
  </section>

<!-- FAQ Accordion -->
<section class="accordion" id="faqAccordion">
  {#each faqs as faq, index}
    <div class="accordion-item">
      <h2 class="accordion-header" id="heading{index}">
        <button
          class="accordion-button {faq.isOpen ? '' : 'collapsed'}"
          type="button"
          on:click={() => toggleFaq(index)}
          aria-expanded="{faq.isOpen}"
          aria-controls="collapse{index}"
        >
          {faq.question}
        </button>
      </h2>
      <div
        id="collapse{index}"
        class="accordion-collapse collapse {faq.isOpen ? 'show' : ''}"
        aria-labelledby="heading{index}"
      >
        <div class="accordion-body">
          {faq.answer}
        </div>
      </div>
    </div>
  {/each}
</section>


  <!-- Contact section -->
  <section class="text-center mt-5">
    <h2>Still have questions?</h2>
    <p>Our support team is here to help. Contact us for personalized assistance.</p>
    <a href="mailto:idiots@thatcatcamp.com" class="btn btn-primary">Contact Us</a>
  </section>
</div>

<style>
  .accordion-button:not(.collapsed) {
    background-color: #f8f9fa;
    color: #0d6efd;
  }

  .accordion-button:focus {
    box-shadow: none;
    border-color: rgba(0,0,0,.125);
  }
</style>
