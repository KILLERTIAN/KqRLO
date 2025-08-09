'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useZKIdentity } from '../hooks/useZKIdentity';
import { AttributeType, VerificationLevel } from '../app/contracts/zkIdentity';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  User, 
  Award, 
  FileText, 
  Download,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  RefreshCw
} from 'lucide-react';

interface FormData {
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface AttributeVerificationData {
  [AttributeType.AGE_OVER_18]: { dateOfBirth: string };
  [AttributeType.AGE_OVER_21]: { dateOfBirth: string };
  [AttributeType.NATIONALITY]: { nationality: string };
  [AttributeType.EDUCATION_LEVEL]: { educationLevel: string };
  [AttributeType.EMPLOYMENT_STATUS]: { employmentStatus: string };
  [AttributeType.CREDIT_SCORE_RANGE]: { creditScore: string };
  [AttributeType.CUSTOM]: { customData: string };
}

export function ZKIdentityManager() {
  const {
    identity,
    verificationLevel,
    verifiedAttributes,
    loading,
    error,
    registerIdentity,
    verifyAttribute,
    generateCertificate,
    createMockZKProof,
    createMockIdentityCommitment,
    createMockNullifier,
    getAttributeName,
    getVerificationLevelName,
    isRegistered,
    checkIdentity,
  } = useZKIdentity();

  const [activeTab, setActiveTab] = useState<'register' | 'verify' | 'certificate'>('register');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  
  const [selectedAttribute, setSelectedAttribute] = useState<AttributeType>(AttributeType.AGE_OVER_18);
  const [attributeData, setAttributeData] = useState<Partial<AttributeVerificationData>>({});
  const [certificateAttributes, setCertificateAttributes] = useState<AttributeType[]>([]);
  const [generatedCertificate, setGeneratedCertificate] = useState<{
    certificateHash: string;
    timestamp: number;
    attributeTypes: AttributeType[];
  } | null>(null);
  const [certificateError, setCertificateError] = useState<string | null>(null);

  // Load saved form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('zkIdentityFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (err) {
        console.error('Failed to load saved form data:', err);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (formData.fullName || formData.email) {
      localStorage.setItem('zkIdentityFormData', JSON.stringify(formData));
    }
  }, [formData]);

  const isFormValid = () => {
    return formData.fullName.trim() && 
           formData.dateOfBirth && 
           formData.nationality && 
           formData.email.trim();
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleRegisterIdentity = async () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const personalDataString = JSON.stringify(formData);
      const identityCommitment = createMockIdentityCommitment(personalDataString);
      const zkProof = createMockZKProof(personalDataString + 'registration');
      const nullifier = createMockNullifier(personalDataString);

      await registerIdentity(identityCommitment, zkProof, nullifier);
      alert('Identity registered successfully!');
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Please try again.');
    }
  };

  const handleVerifyAttribute = async () => {
    if (!isRegistered) {
      alert('Please register your identity first');
      return;
    }

    try {
      let isValid = false;
      let proofData = '';

      // Validate attribute based on form data
      switch (selectedAttribute) {
        case AttributeType.AGE_OVER_18:
          if (formData.dateOfBirth) {
            const age = calculateAge(formData.dateOfBirth);
            isValid = age >= 18;
            proofData = `age_${age}`;
          }
          break;
        case AttributeType.AGE_OVER_21:
          if (formData.dateOfBirth) {
            const age = calculateAge(formData.dateOfBirth);
            isValid = age >= 21;
            proofData = `age_${age}`;
          }
          break;
        case AttributeType.NATIONALITY:
          isValid = !!formData.nationality;
          proofData = formData.nationality;
          break;
        case AttributeType.EDUCATION_LEVEL:
          const educationLevel = attributeData[AttributeType.EDUCATION_LEVEL]?.educationLevel;
          isValid = !!educationLevel;
          proofData = educationLevel || '';
          break;
        case AttributeType.EMPLOYMENT_STATUS:
          const employmentStatus = attributeData[AttributeType.EMPLOYMENT_STATUS]?.employmentStatus;
          isValid = !!employmentStatus;
          proofData = employmentStatus || '';
          break;
        case AttributeType.CREDIT_SCORE_RANGE:
          const creditScore = attributeData[AttributeType.CREDIT_SCORE_RANGE]?.creditScore;
          isValid = !!creditScore;
          proofData = creditScore || '';
          break;
        case AttributeType.CUSTOM:
          const customData = attributeData[AttributeType.CUSTOM]?.customData;
          isValid = !!customData;
          proofData = customData || '';
          break;
      }

      if (!isValid) {
        alert('Cannot verify this attribute with the provided data');
        return;
      }

      const zkProof = createMockZKProof(`attribute_${selectedAttribute}_${proofData}_${Date.now()}`);
      const publicInputs = [BigInt(selectedAttribute), BigInt(isValid ? 1 : 0)];

      await verifyAttribute(selectedAttribute, zkProof, publicInputs);
      alert(`${getAttributeName(selectedAttribute)} verified successfully!`);
    } catch (err) {
      console.error('Attribute verification failed:', err);
      alert('Attribute verification failed. Please try again.');
    }
  };

  const handleGenerateCertificate = async () => {
    if (certificateAttributes.length === 0) {
      setCertificateError('Please select at least one attribute for the certificate');
      return;
    }

    // Check if all selected attributes are verified
    const unverifiedAttributes = certificateAttributes.filter(attr => !verifiedAttributes.has(attr));
    if (unverifiedAttributes.length > 0) {
      setCertificateError(`Please verify these attributes first: ${unverifiedAttributes.map(getAttributeName).join(', ')}`);
      return;
    }

    try {
      setCertificateError(null);
      const certificate = await generateCertificate(certificateAttributes);
      setGeneratedCertificate(certificate);
    } catch (err) {
      console.error('Certificate generation failed:', err);
      setCertificateError('Certificate generation failed. Please try again.');
    }
  };

  const handleUpdateDetails = async () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Save updated data to localStorage
      localStorage.setItem('zkIdentityFormData', JSON.stringify(formData));
      setIsEditing(false);
      alert('Details updated successfully!');
    } catch (err) {
      console.error('Failed to update details:', err);
      alert('Failed to update details. Please try again.');
    }
  };

  const handleRefreshIdentity = async () => {
    try {
      await checkIdentity();
    } catch (err) {
      console.error('Failed to refresh identity:', err);
    }
  };

  const toggleCertificateAttribute = (attr: AttributeType) => {
    setCertificateAttributes((prev: AttributeType[]) => 
      prev.includes(attr) 
        ? prev.filter((a: AttributeType) => a !== attr)
        : [...prev, attr]
    );
  };

  const getVerificationLevelColor = (level: VerificationLevel) => {
    switch (level) {
      case VerificationLevel.PREMIUM: return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case VerificationLevel.ENHANCED: return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case VerificationLevel.BASIC: return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const availableAttributes = Object.values(AttributeType).filter(v => typeof v === 'number') as AttributeType[];

  const renderAttributeForm = () => {
    switch (selectedAttribute) {
      case AttributeType.EDUCATION_LEVEL:
        return (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Education Level
            </label>
            <select
              value={attributeData[AttributeType.EDUCATION_LEVEL]?.educationLevel || ''}
              onChange={(e) => setAttributeData(prev => ({
                ...prev,
                [AttributeType.EDUCATION_LEVEL]: { educationLevel: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            >
              <option value="">Select education level</option>
              <option value="high_school">High School</option>
              <option value="bachelor">Bachelor&apos;s Degree</option>
              <option value="master">Master&apos;s Degree</option>
              <option value="phd">PhD</option>
              <option value="other">Other</option>
            </select>
          </div>
        );
      case AttributeType.EMPLOYMENT_STATUS:
        return (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Employment Status
            </label>
            <select
              value={attributeData[AttributeType.EMPLOYMENT_STATUS]?.employmentStatus || ''}
              onChange={(e) => setAttributeData(prev => ({
                ...prev,
                [AttributeType.EMPLOYMENT_STATUS]: { employmentStatus: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            >
              <option value="">Select employment status</option>
              <option value="employed">Employed</option>
              <option value="self_employed">Self-Employed</option>
              <option value="unemployed">Unemployed</option>
              <option value="student">Student</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        );
      case AttributeType.CREDIT_SCORE_RANGE:
        return (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Credit Score Range
            </label>
            <select
              value={attributeData[AttributeType.CREDIT_SCORE_RANGE]?.creditScore || ''}
              onChange={(e) => setAttributeData(prev => ({
                ...prev,
                [AttributeType.CREDIT_SCORE_RANGE]: { creditScore: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            >
              <option value="">Select credit score range</option>
              <option value="excellent">Excellent (750+)</option>
              <option value="good">Good (700-749)</option>
              <option value="fair">Fair (650-699)</option>
              <option value="poor">Poor (600-649)</option>
              <option value="very_poor">Very Poor (&lt;600)</option>
            </select>
          </div>
        );
      case AttributeType.CUSTOM:
        return (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Custom Attribute Data
            </label>
            <input
              type="text"
              value={attributeData[AttributeType.CUSTOM]?.customData || ''}
              onChange={(e) => setAttributeData(prev => ({
                ...prev,
                [AttributeType.CUSTOM]: { customData: e.target.value }
              }))}
              placeholder="Enter custom attribute data"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            />
          </div>
        );
      default:
        return (
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              This attribute will be verified using your registration data.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-3"
        >
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">
            ZK Identity Manager
          </h1>
        </motion.div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Manage your zero-knowledge identity verification. Prove your attributes without revealing personal information.
        </p>
      </div>

      {/* Status Card */}
      {isRegistered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-lg shadow-lg p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-card-foreground">Identity Status</h2>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getVerificationLevelColor(verificationLevel)}`}>
              {getVerificationLevelName(verificationLevel)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Identity</p>
                <p className="font-medium text-card-foreground">Registered</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Verified Attributes</p>
                <p className="font-medium text-card-foreground">{verifiedAttributes.size}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Registered</p>
                <p className="font-medium text-card-foreground">
                  {identity?.timestamp ? new Date(Number(identity.timestamp) * 1000).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-destructive/10 border border-destructive/20 rounded-lg p-4"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <p className="text-destructive">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        {[
          { id: 'register', label: 'Register Identity', icon: User },
          { id: 'verify', label: 'Verify Attributes', icon: CheckCircle },
          { id: 'certificate', label: 'Generate Certificate', icon: FileText },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as 'register' | 'verify' | 'certificate')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              activeTab === id
                ? 'bg-background text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-lg shadow-lg p-6 border border-border"
      >
        {activeTab === 'register' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-card-foreground">Register Your Identity</h3>
            
            {!isRegistered ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nationality *
                    </label>
                    <select
                      value={formData.nationality}
                      onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      required
                    >
                      <option value="">Select nationality</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="123 Main St, City, State"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    />
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy Notice
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    This information is used to generate a cryptographic commitment to your identity. 
                    Only the commitment hash is stored on the blockchain - your personal data never leaves your device.
                  </p>
                </div>
                
                <button
                  onClick={handleRegisterIdentity}
                  disabled={loading || !isFormValid()}
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted text-primary-foreground font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                  <span>{loading ? 'Registering Identity...' : 'Register Identity'}</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-card-foreground mb-2">Identity Already Registered</h4>
                <p className="text-muted-foreground">Your identity is registered and active on the blockchain.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'verify' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-card-foreground">Verify Attributes</h3>
            
            {isRegistered ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select Attribute to Verify
                  </label>
                  <select
                    value={selectedAttribute}
                    onChange={(e) => setSelectedAttribute(Number(e.target.value) as AttributeType)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  >
                    {availableAttributes.map(attr => (
                      <option key={attr} value={attr}>
                        {getAttributeName(attr)}
                      </option>
                    ))}
                  </select>
                </div>

                {renderAttributeForm()}

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2">Verified Attributes</h4>
                  <div className="space-y-2">
                    {availableAttributes.map(attr => (
                      <div key={attr} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{getAttributeName(attr)}</span>
                        {verifiedAttributes.has(attr) ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <div className="w-4 h-4 border border-border rounded-full" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={handleVerifyAttribute}
                  disabled={loading || verifiedAttributes.has(selectedAttribute)}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-muted text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  <span>
                    {loading ? 'Verifying...' : 
                     verifiedAttributes.has(selectedAttribute) ? 'Already Verified' : 
                     `Verify ${getAttributeName(selectedAttribute)}`}
                  </span>
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-card-foreground mb-2">Identity Required</h4>
                <p className="text-muted-foreground">Please register your identity first before verifying attributes.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'certificate' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-card-foreground">Generate Verification Certificate</h3>
            
            {isRegistered ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select Attributes for Certificate
                  </label>
                  <div className="space-y-2">
                    {availableAttributes.map(attr => (
                      <label key={attr} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={certificateAttributes.includes(attr)}
                          onChange={() => toggleCertificateAttribute(attr)}
                          disabled={!verifiedAttributes.has(attr)}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <span className={`text-sm ${verifiedAttributes.has(attr) ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {getAttributeName(attr)}
                        </span>
                        {verifiedAttributes.has(attr) && <CheckCircle className="w-4 h-4 text-green-600" />}
                      </label>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={handleGenerateCertificate}
                  disabled={loading || certificateAttributes.length === 0}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-muted text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                  <span>{loading ? 'Generating...' : 'Generate Certificate'}</span>
                </button>

                {generatedCertificate && (
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-2">Generated Certificate</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Certificate Hash:</strong> {generatedCertificate.certificateHash}</p>
                      <p><strong>Timestamp:</strong> {new Date(generatedCertificate.timestamp).toLocaleString()}</p>
                      <p><strong>Attributes:</strong> {generatedCertificate.attributeTypes.map(getAttributeName).join(', ')}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(generatedCertificate, null, 2));
                        alert('Certificate copied to clipboard!');
                      }}
                      className="mt-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm py-1 px-3 rounded flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Copy Certificate</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-card-foreground mb-2">Identity Required</h4>
                <p className="text-muted-foreground">Please register your identity first before generating certificates.</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}