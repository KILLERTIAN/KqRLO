'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Eye,
  AlertCircle,
  Loader2,
  Camera,
  Shield,
  User,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentData {
  id: string;
  type: 'passport' | 'license' | 'diploma' | 'utility_bill' | 'other';
  fileName: string;
  uploadDate: Date;
  status: 'pending' | 'verified' | 'rejected';
  extractedData?: {
    name?: string;
    dateOfBirth?: string;
    nationality?: string;
    address?: string;
    issueDate?: string;
    expiryDate?: string;
  };
  verificationNotes?: string;
}

export function DocumentVerifier() {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);

  const documentTypes = [
    { id: 'passport', label: 'Passport', icon: <User className="w-5 h-5" /> },
    { id: 'license', label: 'Driver\'s License', icon: <Shield className="w-5 h-5" /> },
    { id: 'diploma', label: 'Educational Certificate', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'utility_bill', label: 'Utility Bill', icon: <MapPin className="w-5 h-5" /> },
    { id: 'other', label: 'Other Document', icon: <FileText className="w-5 h-5" /> },
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const extractDataFromFileName = (fileName: string) => {
    const lowerName = fileName.toLowerCase();
    let docType: DocumentData['type'] = 'other';
    
    if (lowerName.includes('passport')) docType = 'passport';
    else if (lowerName.includes('license') || lowerName.includes('driver')) docType = 'license';
    else if (lowerName.includes('diploma') || lowerName.includes('certificate') || lowerName.includes('degree')) docType = 'diploma';
    else if (lowerName.includes('utility') || lowerName.includes('bill') || lowerName.includes('statement')) docType = 'utility_bill';
    
    return docType;
  };

  const generateRealisticData = (docType: DocumentData['type']) => {
    const names = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson', 'Lisa Anderson'];
    const nationalities = ['US', 'UK', 'CA', 'AU', 'DE', 'FR'];
    const addresses = [
      '123 Main St, New York, NY 10001',
      '456 Oak Ave, Los Angeles, CA 90210',
      '789 Pine Rd, Chicago, IL 60601',
      '321 Elm St, Houston, TX 77001',
      '654 Maple Dr, Phoenix, AZ 85001'
    ];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomNationality = nationalities[Math.floor(Math.random() * nationalities.length)];
    const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
    
    // Generate realistic dates
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - Math.floor(Math.random() * 50) - 18; // Age 18-68
    const issueYear = currentYear - Math.floor(Math.random() * 5); // Issued within last 5 years
    const expiryYear = issueYear + Math.floor(Math.random() * 10) + 5; // Expires 5-15 years after issue
    
    const dateOfBirth = `${birthYear}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
    const issueDate = `${issueYear}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
    const expiryDate = `${expiryYear}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
    
    const baseData = {
      name: randomName,
      dateOfBirth,
      issueDate,
      expiryDate
    };
    
    switch (docType) {
      case 'passport':
        return {
          ...baseData,
          nationality: randomNationality,
          passportNumber: `P${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        };
      case 'license':
        return {
          ...baseData,
          address: randomAddress,
          licenseNumber: `DL${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        };
      case 'diploma':
        const institutions = ['Harvard University', 'MIT', 'Stanford University', 'Yale University', 'Princeton University'];
        const degrees = ['Bachelor of Science', 'Master of Arts', 'Bachelor of Arts', 'Master of Science', 'PhD'];
        return {
          ...baseData,
          institution: institutions[Math.floor(Math.random() * institutions.length)],
          degree: degrees[Math.floor(Math.random() * degrees.length)],
          graduationDate: issueDate,
        };
      case 'utility_bill':
        return {
          name: randomName,
          address: randomAddress,
          billDate: issueDate,
          accountNumber: `ACC${Math.random().toString(36).substr(2, 10).toUpperCase()}`,
        };
      default:
        return {
          ...baseData,
          nationality: randomNationality,
          address: randomAddress,
        };
    }
  };

  const handleFiles = async (files: FileList) => {
    setProcessing(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Simulate document processing with realistic timing
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      const docType = extractDataFromFileName(file.name);
      const extractedData = generateRealisticData(docType);
      
      const newDoc: DocumentData = {
        id: Date.now().toString() + i,
        type: docType,
        fileName: file.name,
        uploadDate: new Date(),
        status: 'pending',
        extractedData
      };
      
      setDocuments(prev => [...prev, newDoc]);
    }
    
    setProcessing(false);
  };

  const verifyDocument = async (docId: string, approved: boolean) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId 
        ? { 
            ...doc, 
            status: approved ? 'verified' : 'rejected',
            verificationNotes: approved ? 'Document verified successfully' : 'Document could not be verified'
          }
        : doc
    ));
  };

  const getStatusColor = (status: DocumentData['status']) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'rejected': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    }
  };

  const getStatusIcon = (status: DocumentData['status']) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Document Verification</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload identity documents for verification. Our AI-powered system will extract and verify information while maintaining your privacy.
        </p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-primary bg-primary/5 scale-105' 
              : 'border-border hover:border-primary/50 hover:bg-card/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                {processing ? (
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                ) : (
                  <Upload className="w-8 h-8 text-primary" />
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {processing ? 'Processing Documents...' : 'Upload Documents'}
              </h3>
              <p className="text-muted-foreground">
                Drag and drop files here, or click to select files
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Supports: Images (JPG, PNG) and PDF files
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>Take Photo</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Browse Files</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Document Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl p-6 border border-border"
      >
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Supported Document Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {documentTypes.map((type) => (
            <div
              key={type.id}
              className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="p-2 bg-primary/10 rounded-full mb-2">
                {type.icon}
              </div>
              <span className="text-sm text-center text-secondary-foreground">{type.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Documents List */}
      {documents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-foreground">Uploaded Documents</h3>
          
          <div className="grid gap-4">
            {documents.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-card-foreground">{doc.fileName}</h4>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {getStatusIcon(doc.status)}
                          <span className="capitalize">{doc.status}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Uploaded on {doc.uploadDate.toLocaleDateString()}
                      </p>
                      
                      {doc.extractedData && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 p-4 bg-secondary/30 rounded-lg">
                          {doc.extractedData.name && (
                            <div>
                              <span className="text-xs text-muted-foreground">Name</span>
                              <p className="font-medium">{doc.extractedData.name}</p>
                            </div>
                          )}
                          {doc.extractedData.dateOfBirth && (
                            <div>
                              <span className="text-xs text-muted-foreground">Date of Birth</span>
                              <p className="font-medium">{doc.extractedData.dateOfBirth}</p>
                            </div>
                          )}
                          {doc.extractedData.nationality && (
                            <div>
                              <span className="text-xs text-muted-foreground">Nationality</span>
                              <p className="font-medium">{doc.extractedData.nationality}</p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {doc.verificationNotes && (
                        <p className="text-sm text-muted-foreground italic">
                          {doc.verificationNotes}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDoc(doc)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    
                    {doc.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => verifyDocument(doc.id, true)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => verifyDocument(doc.id, false)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Document Preview Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-card-foreground">Document Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDoc(null)}
                >
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">File Name</span>
                    <p className="font-medium">{selectedDoc.fileName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedDoc.status)}`}>
                      {getStatusIcon(selectedDoc.status)}
                      <span className="capitalize">{selectedDoc.status}</span>
                    </div>
                  </div>
                </div>
                
                {selectedDoc.extractedData && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-card-foreground">Extracted Information</h4>
                    <div className="grid gap-3">
                      {Object.entries(selectedDoc.extractedData).map(([key, value]) => (
                        <div key={key} className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                          <span className="text-sm text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}