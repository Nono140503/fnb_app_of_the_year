import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Linking, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const ComplianceEssentials = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentVideo, setCurrentVideo] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [modalDescription, setModalDescription] = useState('');
    const [modalLink, setModalLink] = useState('');
    const [iconModalVisible, setIconModalVisible] = useState(false);
    const [iconModalContent, setIconModalContent] = useState('');
    const [iconModalContentImage, setIconModalContentImage] = useState('');
    const [iconModalHeading, setIconModalHeading] = useState(''); // New state for icon modal heading

    const openModal = (videoUrl, description, modalDescription, link) => {
        setCurrentVideo(videoUrl);
        setModalContent(description);
        setModalDescription(modalDescription);
        setModalLink(link);
        setModalVisible(true);
    };

    const openIconModal = (heading) => {
        let content = '';
        let image;
        switch (heading) {
            case 'Finance Regulations':
                content = `Finance regulations govern the financial conduct of businesses and organizations. They include rules about financial reporting, auditing, and maintaining proper records. Understanding these regulations is essential for compliance and avoiding legal penalties.`;
                image = require('../../assets/Corporate-Law.jpg')
                break;
            case 'Employment Laws':
                content = `Employment laws protect the rights of employees and employers. They cover a range of topics including minimum wage, workplace safety, anti-discrimination laws, and employee benefits. Businesses must comply with these laws to foster a fair and safe work environment.`;
                image = require('../../assets/employment_laws.jpeg')
                break;
            case 'Business Regulations':
                content = `Business regulations encompass various laws that businesses must follow to operate legally. These may include licensing requirements, environmental regulations, and consumer protection laws. Compliance helps maintain ethical standards and prevents legal issues.`;
                image = require('../../assets/b-regulations.jpeg')
                break;
            case 'Licenses and Permits':
                content = `Obtaining the necessary licenses and permits is crucial for legal operation. This may include local business licenses, zoning permits, and industry-specific certifications. Failing to secure these can lead to fines or business shutdowns.`;
                image = require('../../assets/licences.jpg')
                break;
            default:
                content = 'No additional information available.';
                break;
        }
        setIconModalHeading(heading);
        setIconModalContent(content);
        setIconModalVisible(true);
        setIconModalContentImage(image);
    };
    const handleBack = () =>{
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Ionicons name='arrow-back-outline' size={30} onPress={handleBack}/>
                    <Text style={styles.head}>Compliance Essentials</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>Business Compliance</Text>
                </View>

                <View style={styles.iconRow}>
                    <TouchableOpacity onPress={() => openIconModal('Finance Regulations', 'Information about Finance Regulations')} style={styles.iconContainer}>
                        <Ionicons name="cash" size={50} color="#003366" /> 
                        <Text style={styles.iconLabel}>Finance Regulations</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openIconModal('Employment Laws', 'Information about Employment Laws')} style={styles.iconContainer}>
                        <Ionicons name="people" size={50} color="#228B22" /> 
                        <Text style={styles.iconLabel}>Employment Laws</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openIconModal('Business Regulations', 'Information about Business Regulations')} style={styles.iconContainer}>
                        <Ionicons name="business" size={50} color="#FF4500" /> 
                        <Text style={styles.iconLabel}>Business Regulations</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openIconModal('Licenses and Permits', 'Information about Licenses and Permits')} style={styles.iconContainer}>
                        <Ionicons name="document" size={50} color="#708090" /> 
                        <Text style={styles.iconLabel}>Licenses and Permits</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => openModal(
                    'https://www.youtube.com/embed/N0RG9uttpHg',
                    'e-Filing',
                    "E-filing is the process of submitting tax returns online through the South African Revenue Service (SARS). It streamlines the filing process, reduces paperwork, and allows for faster refunds. Ensure you have all necessary documents ready, such as IRP5s, IT3s, and other relevant financial statements.",
                    'https://www.sars.gov.za/businesses-and-employers/small-businesses-taxpayers/'
                )} style={styles.touchableSection}>
                    <View style={styles.section}>
                        <Text style={styles.heading}>e-Filing</Text>
                        <Text style={styles.description}>Tax returns etc, relating to SARS</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={30} color="gray" style={styles.arrowIcon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => openModal(
                    'https://www.youtube.com/embed/7zinITijO_0',
                    'Business Banking',
                    "Business banking is crucial for managing your company’s finances. It includes opening a business checking account, obtaining a business credit card, and establishing a line of credit. Make sure to choose a bank that understands your business needs and offers the services that will help you grow.",
                    'https://www.fnb.co.za/business-banking/business-accounts/'
                )} style={styles.touchableSection}>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Business Banking</Text>
                        <Text style={styles.description}>Create bank account, banking essentials</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={30} color="gray" style={styles.arrowIcon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => openModal(
                    'https://www.youtube.com/embed/LVB4VlkuQ4o',
                    'Legal and Contracts',
                    "Understanding legal and contractual obligations is vital for any business. This includes knowing about intellectual property rights, employee contracts, and client agreements. It is recommended to consult with a legal professional to ensure compliance and protect your business interests.",
                    'https://www.cipc.co.za/'
                )} style={styles.touchableSection}>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Legal and Contracts</Text>
                        <Text style={styles.description}>Intellectual Property</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={30} color="blue" style={styles.arrowIcon} />
                </TouchableOpacity>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                    setCurrentVideo('');
                    setModalContent('');
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalHeading}>{modalContent}</Text>
                    <WebView 
                        source={{ uri: currentVideo }} 
                        style={styles.video}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        onHttpError={() => console.log('HTTP Error')}
                        onError={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent;
                            console.error('WebView error: ', nativeEvent);
                        }}
                    />
                    <Text style={styles.dummyText}>{modalDescription}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(modalLink)}>
                        <Text style={styles.link}>Learn More</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={false}
                visible={iconModalVisible}
                onRequestClose={() => {
                    setIconModalVisible(false);
                    setIconModalHeading(''); // Clear the heading
                    setIconModalContent('');
                }}
            >
                <View style={styles.iconModalView}>
                    <Text style={styles.iconModalHeading}>{iconModalHeading}</Text> 
                    <Image source={iconModalContentImage} style={styles.img}/>
                    <Text style={styles.iconModalContent}>{iconModalContent}</Text>
                    <TouchableOpacity onPress={() => setIconModalVisible(false)}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#E0ECFD'
    },
    section: {
        width: '100%',
        marginTop: 10,
    },
    header: {
        flexDirection: 'row',
        top: 30,
    },
    head: {
        fontSize: 22,
        marginLeft: 50,
        fontWeight: 'bold',
    },
    img:{
        width: 350,
        height: 200,
        borderRadius: 5,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 60,
    },
    description: {
        color: 'grey',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    iconContainer: {
        alignItems: 'center',
        width: '30%',
    },
    iconLabel: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 14,
    },
    touchableSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    arrowIcon: {
        right: 15,
        top: 35
    },
    modalView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        maxHeight: '60%',
        marginTop: 25,
    },
    iconModalView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    modalHeading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1d61e7',
    },
    iconModalHeading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        color: '#1d61e7',
    },
    video: {
        width: 350,
        height: 200,
        marginTop: 10,
    },
    dummyText: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
    },
    iconModalContent: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
    },
    link: {
        color: 'blue',
        marginTop: 10,
        fontSize: 18,
    },
    closeButton: {
        marginTop: 20,
        color: 'red',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default ComplianceEssentials;
