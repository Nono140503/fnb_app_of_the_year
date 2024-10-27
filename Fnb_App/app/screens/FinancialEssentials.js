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
        return (
          <>
            <Text style={styles.topicText}>
              Cash flow is the lifeblood of any business. It represents the net amount of cash coming in and going out of your business over a specific period.{"\n"}{"\n"}
            </Text>
            <Text style={styles.topicSubTitle}>Tips for Managing Cash Flow:{"\n"}</Text>
            <Text style={styles.topicBullet}>• Monitor Cash Flow Daily: Keep track of your income and expenses.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Invoice Promptly: Ensure customers are invoiced immediately after service or product delivery to avoid delays.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Negotiate Payment Terms: Work with suppliers to extend payment deadlines.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Use Cash Flow Forecasting Tools: Plan for future cash needs.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Consider Invoice Factoring: Use factoring to get immediate cash for unpaid invoices.</Text>
          </>
        );
  
      case "Expense Management":
        return (
          <>
            <Text style={styles.topicText}>
              Expense management involves keeping business expenses in check while optimizing resources.{"\n"}{"\n"}
            </Text>
            <Text style={styles.topicSubTitle}>Tips for Managing Expenses:{"\n"}</Text>
            <Text style={styles.topicBullet}>• Create a Budget: Set a budget and stick to it for better control over expenses.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Review Regularly: Evaluate business expenses periodically and identify areas to cut costs.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Negotiate with Suppliers: Secure better prices or payment terms.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Use Expense Tracking Apps: Monitor business spending in real-time.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Automate Payments: Avoid late payment penalties with automated systems.</Text>
          </>
        );
  
      case "Stock Tracking Tools":
        return (
          <>
            <Text style={styles.topicText}>
              Managing inventory is critical for businesses to avoid both stock shortages and overstocking.{"\n"}{"\n"}
            </Text>
            <Text style={styles.topicSubTitle}>Benefits of Stock Tracking Tools:{"\n"}</Text>
            <Text style={styles.topicBullet}>• Real-Time Monitoring: Track stock levels continuously to avoid running out of key items.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Reduce Theft and Loss: Monitor inventory movements and reduce theft risks.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Forecast Demand: Use historical data to predict future stock needs.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Use Just-in-Time (JIT) Inventory: Minimize holding costs by stocking only what is needed.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Set Low-Stock Alerts: Get notifications when stock is running low.</Text>
          </>
        );
  
      case "Digital Payments":
        return (
          <>
            <Text style={styles.topicText}>
              Digital payments offer a secure, fast, and efficient way to conduct business transactions.{"\n"}{"\n"}
            </Text>
            <Text style={styles.topicSubTitle}>Advantages of Digital Payments:{"\n"}</Text>
            <Text style={styles.topicBullet}>• Improved Cash Flow: Payments are received faster compared to traditional methods.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Enhanced Security: Minimize theft and fraud risks by reducing cash handling{"\n"}.</Text>
            <Text style={styles.topicBullet}>• Convenience for Customers: Provide multiple payment options, such as cards, mobile wallets, and EFTs.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Better Financial Record-Keeping: Maintain transaction records automatically.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Access to Financing: Build credit history by using digital platforms.</Text>
          </>
        );
  
      case "Invoices":
        return (
          <>
            <Text style={styles.topicText}>
              Creating professional invoices ensures prompt payments and improves customer relationships.{"\n"}{"\n"}
            </Text>
            <Text style={styles.topicSubTitle}>Tips for Creating Effective Invoices:{"\n"}</Text>
            <Text style={styles.topicBullet}>• Clear Payment Terms: Include due dates and payment terms.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Automate Invoicing: Use software tools to send invoices quickly.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Provide Multiple Payment Options: Make it easy for customers to pay.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Follow Up on Unpaid Invoices: Implement reminder systems.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Integrate with Accounting Tools: Sync invoices with accounting software for seamless management.</Text>
          </>
        );
  
      case "Supplier Orders":
        return (
          <>
            <Text style={styles.topicText}>
              Efficient supplier management ensures smooth business operations.{"\n"}{"\n"}
            </Text>
            <Text style={styles.topicSubTitle}>Best Practices for Managing Supplier Orders:{"\n"}</Text>
            <Text style={styles.topicBullet}>• Maintain Strong Relationships: Work closely with suppliers to get better terms.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Order in Advance: Avoid last-minute stockouts by planning ahead.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Track Order Status: Use software to monitor supplier order status.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Negotiate Discounts: Seek bulk discounts or better payment terms.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Maintain Safety Stock: Always keep a buffer stock for emergencies.</Text>
          </>
        );
  
      case "Loans":
        return (
          <>
            <Text style={styles.topicText}>
              Accessing loans can help businesses grow by providing needed capital.{"\n"}{"\n"}
            </Text>
            <Text style={styles.topicSubTitle}>Types of Loans for Small Businesses:{"\n"}</Text>
            <Text style={styles.topicBullet}>• Microfinance Loans: Designed for small businesses in informal sectors.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Working Capital Loans: To manage daily operational expenses.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Asset Financing: Use assets as collateral for loans.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Overdraft Facilities: Flexible borrowing options linked to your bank account.{"\n"}{"\n"}</Text>
            <Text style={styles.topicSubTitle}>Tips for Getting Loans:{"\n"}</Text>
            <Text style={styles.topicBullet}>• Understand Loan Terms: Read and understand loan agreements before committing.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Maintain Good Credit: Build a positive credit history.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Explore Government Programs: Look for government-backed loans or grants.{"\n"}</Text>
          </>
        );
  
      case "Interest Rates":
        return (
          <>
            <Text style={styles.topicText}>
              Interest rates determine the cost of borrowing and play a key role in financial planning.{"\n"}{"\n"}
            </Text>
            <Text style={styles.topicSubTitle}>Understanding Interest Rates:{"\n"}</Text>
            <Text style={styles.topicBullet}>• Fixed vs. Variable Rates: Know whether the rate is fixed or will fluctuate.{"\n"}</Text>
            <Text style={styles.topicBullet}>• APR (Annual Percentage Rate): This reflects the total borrowing cost, including fees.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Impact on Cash Flow: Higher interest rates increase loan repayment amounts.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Compare Lenders: Shop around for the best interest rates.{"\n"}</Text>
            <Text style={styles.topicBullet}>• Factor in Loan Tenure: The longer the loan term, the higher the total interest paid.{"\n"}</Text>
          </>
        );
  
      default:
        return <Text style={styles.topicText}>No information available.</Text>;
    }
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f9",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    
    marginTop: 45,
  },
  bulletContainer: {
    marginLeft: 15,  
    paddingVertical: 5,
  },
  topicText: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  topicSubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  topicBullet: {
    fontSize: 16,
    marginVertical: 5,
    lineHeight: 20,
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
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    borderRadius: 8,
    width: '50%' ,
    alignItems: 'center',
},
  footerButtonText: { 
    color: "white", 
    fontWeight: "bold"
 },
 back:{
    padding: 5,
    bottom: 5,
 },
});

export default FinancialEssentials;
