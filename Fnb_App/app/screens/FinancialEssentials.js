import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function FinancialEssentials({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [faqModalVisible, setFaqModalVisible] = useState(false);

  const handleOpenModal = (topic) => {
    setSelectedTopic(topic);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTopic("");
  };

  const handleOpenFaqModal = () => {
    setFaqModalVisible(true);
  };

  const handleCloseFaqModal = () => {
    setFaqModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Financial Essentials</Text>
        <Ionicons name="search-outline" size={24} color="black" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Financial Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cash Flow Management</Text>
          <View style={styles.cardContainer}>
            <LessonCard
              title="Understanding Cash Flow"
              onPress={() => handleOpenModal("Cash Flow")}
            />
            <LessonCard
              title="Expense Management"
              onPress={() => handleOpenModal("Expense Management")}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Digital Tools for Small Businesses
          </Text>
          <View style={styles.cardContainer}>
            <LessonCard
              title="Stock Tracking Tools"
              onPress={() => handleOpenModal("Stock Tracking Tools")}
            />
            <LessonCard
              title="Digital Payments"
              onPress={() => handleOpenModal("Digital Payments")}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoices & Quotations</Text>
          <View style={styles.cardContainer}>
            <LessonCard
              title="Creating Professional Invoices"
              onPress={() => handleOpenModal("Invoices")}
            />
            <LessonCard
              title="Handling Supplier Orders"
              onPress={() => handleOpenModal("Supplier Orders")}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Literacy & Loans</Text>
          <View style={styles.cardContainer}>
            <LessonCard
              title="Getting Access to Loans"
              onPress={() => handleOpenModal("Loans")}
            />
            <LessonCard
              title="Interest Rates Explained"
              onPress={() => handleOpenModal("Interest Rates")}
            />
          </View>
        </View>

        {/* Footer with FAQs Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.faqButton}
            onPress={handleOpenFaqModal}
          >
            <Text style={styles.footerButtonText}>FAQ'S</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal for Topic Details */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>{selectedTopic}</Text>
              <Text style={styles.modalDescription}>
                {getTopicDescription(selectedTopic)}
              </Text>
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* FAQ Modal */}
      <Modal
        transparent={true}
        visible={faqModalVisible}
        animationType="slide"
        onRequestClose={handleCloseFaqModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                Frequently Asked Questions (FAQ)
              </Text>
              {getFaqContent().map((faq, index) => (
                <View key={index} style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                </View>
              ))}
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={handleCloseFaqModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const LessonCard = ({ title, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{title}</Text>
  </TouchableOpacity>
);

const getFaqContent = () => [
  {
    question: "How can I improve cash flow management?",
    answer:
      "Monitor your daily transactions, use tools like invoice factoring, and build emergency reserves.",
  },
  {
    question: "What are digital payment benefits for small businesses?",
    answer:
      "Digital payments help reduce theft, provide better record-keeping, and offer convenience for customers.",
  },
  {
    question: "How does W2Q improve invoicing?",
    answer:
      "W2Q converts WhatsApp messages into professional invoices, reducing delays and enhancing documentation.",
  },
  {
    question: "How can I access small business loans?",
    answer:
      "Consider microfinance institutions, government programs, or digital loan platforms tailored for SMEs.",
  },
];

const getTopicDescription = (topic) => {
  switch (topic) {
    case "Cash Flow":
      return `Cash flow is the lifeblood of any business. It represents the net amount of cash coming in and going out of your business over a specific period. 
            **Tips for Managing Cash Flow:**
            - **Monitor Cash Flow Daily:** Keep track of your income and expenses.
            - **Invoice Promptly:** Ensure customers are invoiced immediately after service or product delivery to avoid delays.
            - **Negotiate Payment Terms:** Work with suppliers to extend payment deadlines.
            - **Use Cash Flow Forecasting Tools:** Plan for future cash needs.
            - **Consider Invoice Factoring:** Use factoring to get immediate cash for unpaid invoices.`;

    case "Expense Management":
      return `Expense management involves keeping business expenses in check while optimizing resources.
            **Tips for Managing Expenses:**
            - **Create a Budget:** Set a budget and stick to it for better control over expenses.
            - **Review Regularly:** Evaluate business expenses periodically and identify areas to cut costs.
            - **Negotiate with Suppliers:** Secure better prices or payment terms.
            - **Use Expense Tracking Apps:** Monitor business spending in real-time.
            - **Automate Payments:** Avoid late payment penalties with automated systems.`;

    case "Stock Tracking Tools":
      return `Managing inventory is critical for businesses to avoid both stock shortages and overstocking.
            **Benefits of Stock Tracking Tools:**
            - **Real-Time Monitoring:** Track stock levels continuously to avoid running out of key items.
            - **Reduce Theft and Loss:** Monitor inventory movements and reduce theft risks.
            - **Forecast Demand:** Use historical data to predict future stock needs.
            - **Use Just-in-Time (JIT) Inventory:** Minimize holding costs by stocking only what is needed.
            - **Set Low-Stock Alerts:** Get notifications when stock is running low.`;

    case "Digital Payments":
      return `Digital payments offer a secure, fast, and efficient way to conduct business transactions.
            **Advantages of Digital Payments:**
            - **Improved Cash Flow:** Payments are received faster compared to traditional methods.
            - **Enhanced Security:** Minimize theft and fraud risks by reducing cash handling.
            - **Convenience for Customers:** Provide multiple payment options, such as cards, mobile wallets, and EFTs.
            - **Better Financial Record-Keeping:** Maintain transaction records automatically.
            - **Access to Financing:** Build credit history by using digital platforms.`;

    case "Invoices":
      return `Creating professional invoices ensures prompt payments and improves customer relationships.
            **Tips for Creating Effective Invoices:**
            - **Clear Payment Terms:** Include due dates and payment terms.
            - **Automate Invoicing:** Use software tools to send invoices quickly.
            - **Provide Multiple Payment Options:** Make it easy for customers to pay.
            - **Follow Up on Unpaid Invoices:** Implement reminder systems.
            - **Integrate with Accounting Tools:** Sync invoices with accounting software for seamless management.`;

    case "Supplier Orders":
      return `Efficient supplier management ensures smooth business operations.
            **Best Practices for Managing Supplier Orders:**
            - **Maintain Strong Relationships:** Work closely with suppliers to get better terms.
            - **Order in Advance:** Avoid last-minute stockouts by planning ahead.
            - **Track Order Status:** Use software to monitor supplier order status.
            - **Negotiate Discounts:** Seek bulk discounts or better payment terms.
            - **Maintain Safety Stock:** Always keep a buffer stock for emergencies.`;

    case "Loans":
      return `Accessing loans can help businesses grow by providing needed capital.
            **Types of Loans for Small Businesses:**
            - **Microfinance Loans:** Designed for small businesses in informal sectors.
            - **Working Capital Loans:** To manage daily operational expenses.
            - **Asset Financing:** Use assets as collateral for loans.
            - **Overdraft Facilities:** Flexible borrowing options linked to your bank account.
            **Tips for Getting Loans:**
            - **Understand Loan Terms:** Read and understand loan agreements before committing.
            - **Maintain Good Credit:** Build a positive credit history.
            - **Explore Government Programs:** Look for government-backed loans or grants.`;

    case "Interest Rates":
      return `Interest rates determine the cost of borrowing and play a key role in financial planning.
            **Understanding Interest Rates:**
            - **Fixed vs. Variable Rates:** Know whether the rate is fixed or will fluctuate.
            - **APR (Annual Percentage Rate):** This reflects the total borrowing cost, including fees.
            - **Impact on Cash Flow:** Higher interest rates increase loan repayment amounts.
            - **Compare Lenders:** Shop around for the best interest rates.
            - **Factor in Loan Tenure:** The longer the loan term, the higher the total interest paid.`;

    default:
      return "No information available.";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    
    marginTop: 45,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "90%",
    height: "70%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 10 
},
  faqItem: { 
    marginBottom: 15 
},
  faqQuestion: { 
    fontWeight: "bold",
    marginBottom: 5 
},
  faqAnswer: { 
    fontSize: 16, 
    marginBottom: 10 
},
  closeButton: {
    backgroundColor: "#1d61e7",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: { 
    color: "white", 
    fontWeight: "bold" 
},
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  faqButton: { 
    backgroundColor: "#1d61e7", 
    padding: 15, 
    borderRadius: 8 
},
  footerButtonText: { 
    color: "white", 
    fontWeight: "bold"
 },
 back:{
    padding: 5,
 },
});

export default FinancialEssentials;
