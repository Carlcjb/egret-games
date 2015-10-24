# -*- coding: gbk -*-

error_str = '_error'

#cell types:
ct_int = 0
ct_str = 1
ct_float = 2
ct_var = 3
ct_arr_int = 4
ct_arr_str = 5
ct_arr_float = 6
ct_arr_var = 7

# ����ʹ��[]��������str����ֹ�����
class solid_str(str):
    def __getitem__(self, i):
    	raise Exception,"��Ӧ��solid_str����ʹ��[]������"
    def __getslice__(self, a, b):
    	raise Exception,"��Ӧ��solid_str����ʹ��[]������"
    def __repr__(self):
        s = str(self.decode("utf-8").encode("utf-8"))
        if self.find('"') == 0 and self.rfind('"') == len(self)-1:
            return s
    	return '"' + s + '"'

# ��mb���Ĳ��������ر���һ�£���ҪĿ���Ƿ�ֹ����
class var_type:
    def __init__(self, v):
    	self.v = v
    def toint(self):
    	if self.v=='':
    		return 0
    	else:
    		try:
    			return int(self.v)
    		except:
    			print '���� toint()���󣬷���0��ֵΪ��', self.v
    			return 0
    def tostr(self):
    	try:
    		return str(self.v)
    	except:
    		print '���� tostr()���󣬷���""��ֵΪ��', self.v
    		return ""
    def tofloat(self):
    	if self.v=='':
    		return 0.0
    	else:
    		try:
    			return float(self.v)
    		except:
    			print '���� tofloat()���󣬷���0.0��ֵΪ��', self.v
    			return 0.0

def toint(v):
    if v=='':
    	return 0
    else:
    	try:
    		return int(v)
    	except:
    		return 0
def tostr(v):
    try:
    	return solid_str(v)
    except:
    	return 0
def tofloat(v):
    if v=='':
    	return 0.0
    else:
    	try:
    		return float(v)
    	except:
    		return 0.0


# ���ֲ�ͬ���͵�list
class int_list(list):
    def __getitem__(self, i):
    	if i>=self.__len__() or i<-self.__len__():
    		print 'int_list�±�Խ�磬ԭ���ȣ�',self.__len__(),'�±꣺',i
    		return 0
    	return toint(list.__getitem__(self, i))
    def __getslice__(self, a, b):
    	return int_list(list.__getslice__(self, a, b))
    def __iter__(self):
    	for i in range(0, self.__len__()):
    		yield toint(list.__getitem__(self,i))
    def __repr__(self):
        return "[" + ", ".join( [str(i) for i in self] ) + "]"
        

class str_list(list):
    def __getitem__(self, i):
    	if i>=self.__len__() or i<-self.__len__():
    		print 'str_list�±�Խ�磬ԭ���ȣ�',self.__len__(),'�±꣺',i
    		return solid_str('')
    	return tostr(list.__getitem__(self, i))
    def __getslice__(self, a, b):
    	return str_list(list.__getslice__(self, a, b))
    def __iter__(self):
    	for i in range(0, self.__len__()):
    		yield tostr(list.__getitem__(self,i))

class float_list(list):
    def __getitem__(self, i):
    	if i>=self.__len__() or i<-self.__len__():
    		print 'float_list�±�Խ�磬ԭ���ȣ�',self.__len__(),'�±꣺',i
    		return 0.0
    	return tofloat(list.__getitem__(self, i))
    def __getslice__(self, a, b):
    	return float_list(list.__getslice__(self, a, b))
    def __iter__(self):
    	for i in range(0, self.__len__()):
    		yield tofloat(list.__getitem__(self,i))
    def __repr__(self):
        return "[" + ", ".join( [str(i) for i in self] ) + "]"

class var_list(list):
    def __getitem__(self, i):
    	if i>=self.__len__() or i<-self.__len__():
    		print 'var_list�±�Խ�磬ԭ���ȣ�',self.__len__(),'�±꣺',i
    		return 0.0
    	return var_type(list.__getitem__(self, i))
    def __getslice__(self, a, b):
    	return var_list(list.__getslice__(self, a, b))
    def __iter__(self):
    	for i in range(0, self.__len__()):
    		yield var_type(list.__getitem__(self,i))

def is_list_type(l):
    t = type(l)
    if t==type([]) or t==type(var_list([])) or t==type(int_list([])) or t==type(str_list([])) or t==type(float_list([])):
    	return True
    return False

