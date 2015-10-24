# -*- coding: gbk -*-
r'''
mb_tableģ����һ��ר��Ϊ��ȡmb�����ƵĿ⡣������ص��ǣ��ܹ�����ʻ�������һ�����ʱ���ڵײ��Ѿ���������ͣ�ʹ��ʱ����ָ�����͡�
mb�����ʵ������Excel��ʽ�洢��txt���ĳЩ������Ž���֤��Excel�༭����ȷ��
ʹ�÷�����
1������mb���
	create_mb(paths)
	���ӣ�g_index_list = create_mb(r'D:\mb\index_list.txt')
	
2����ȡmb���
	���ӣ�D:\test.txt��
�������ͣ�1	0	1	2	4	5
Ĭ���У�����ȡ�д���ʱ�������У�Ϊ��ʱ���ִ��󣬱�python���ⲻ֧��Ĭ���У�
��ͷ��	ע��(1)	ID(0)	����(2)	��������(4)	��������(5)
		����	1	3.4	5*6*7*56	Ilike*py_mb*256
		����	2	8.9	4*5*8*98	Ilike*py_mb*336	hello
	t = create_mb([r'D:\test.txt']);
	line = t[2]	#���ر������Ϊ2���У�line������Ϊmb_line
	print line[0]	#str���ͣ���ӡ���������
	print line[1]	#int���ͣ���ӡ�����2
	print line[2]	#float���ͣ���ӡ�����8.9
	print line[3]	#list���ͣ���ӡ�����[4,5,8,98]
	print line[4]	#list���ͣ���ӡ�����['Ilike','py_mb','336']
	print line[5]	#�����Ѿ���������ķ�Χ���Զ��������һ�ж���5��str����ӡ�����hello
	line.index()	#����l���е�����ID��ͬline[1]������2

	��������
		t = create_mb(r'D:\test.txt');
		for line in t:
			#��lineѭ������ÿһ��
		for i in range(0, len(t))
			#len(t)���ر��t������

3���������ͣ�
		0:����	4:��������
		1:�ַ���	5���ַ�������
		2:������	6������������
		3:�仯���ͣ���ָ�����ͣ�	7����ָ�����͵�����
	ʹ��ʱ��ֱ�ӷ���python��Ӧ���ͣ�int��str��float��var_type
	����var_type����ʹ��toint()��tostr()�ȳ�Ա������һ��ת�������鼴Ϊpython list
	PS��Ϊʹ��ʱ����ʧ�󣬱�����ܶԷ������������⴦�����粻����Է��ص�str����Ƭ������
'''

import os
import sys
import re
from global_define import *

class mb_line:
	def __init__(self):
		self.cells = []
		self.is_bad = False
	def set_line(self, cells):
		self.cells = cells
	def set_father(self, table):
		self.father = table
	def __getitem__(self,i):
		try:
			t = self.father.get_type(i)
			if (i>=0 and i<len(self.cells)) or (i<0 and i>=-len(self.cells)):
				ret = self.cells[i]
			else:
				ret = ''
			if t == ct_int:
				if ret == '':
					ret = 0
				else:
					ret = int(ret)
			elif t == ct_str:
				ret = solid_str(ret)
			elif t == ct_float:
				if ret == '':
					ret = 0.0
				else:
					ret = float(ret)
			elif t == ct_var:
				ret = var_type(ret)
			elif t == ct_arr_int:
				ret = ret.split('*')
				if ret==['']:
					return []
				ret = int_list(ret)
			elif t == ct_arr_str:
				if ret == '':
					ret = []
				else:
					ret = ret.split('*')
					ret = str_list(ret)
			elif t == ct_arr_float:
				ret = ret.split('*')
				ret = float_list(ret)
			elif t == ct_arr_var('*'):
				ret = ret.split('*')
				ret = var_list(ret)
			else:
				pass
			return ret
		except:
			print '��ȡĳ��Ԫ������У�', i, '��',self.father.name,
			print '����%s, ֵ%s'%( self.father.get_type(i), self.cells[i] )
			return None
	def getstr(self, i):
		try:
			return self.cells[i]
		except:
			return ''
	def empty(self, i):
		try:
			return self.cells[i] == ''
		except:
			return True
	def getint(self, i):
		if self.cells[i] == '':
			return 0
		elif self.cells[i].isdigit():
			return int(self.cells[i])
		else:
			print 'getint ʧ�ܣ�����0��ֵΪ��', self.cells[i]
			return 0
	def getfloat(self, i):
		if self.cells[i] == '':
			return 0.0
		elif self.cells[i].isdigit():
			return float(self.cells[i])
		else:
			print 'getfloat ʧ�ܣ�����0.0��ֵΪ��', self.cells[i]
			return 0.0
	def __len__(self):	return len(self.father.types)
	def data(self):	return self.cells
	def index(self):
		return toint(self.cells[1])
	def __iter__(self):
		for cell in self.cells:
			yield cell



class mb_table:
	def __init__(self):
		self.types = []
		self.index_map = {}
		self.lines = []
		self.table_head = None
		self.default_line = []
	def set_name(self, name):
		self.name = name
	def get_type(self, col):
		if col >= len(self.types) or col<0:
			print self.name, self.types, col
			return -1
		return self.types[col]
	def set_data(self, cells):
		# ����������
		for l in cells:
			line = mb_line()
			line.set_line(l)
			line.set_father(self)
			self.lines.append(line)
		# ��������
		for i in range(0, len(self.lines)):
			value = None
			try:
				value = int(self.lines[i][1])
			except (TypeError, ValueError), e:
				print '�������ʱ�������󣬱�%s, �У�%d'%(self.name, i), '�����ݣ�', cells[i]
				self.lines[i].is_bad = True
				continue
			if self.index_map.has_key( value ):
				print '�������ʱ�����ظ�����%s, �У�%d��������%d'%(self.name, i,value)
				self.lines[i].is_bad = True
				continue
			self.index_map[ value ] = i
		return True
	def set_head(self, head_cells):
		try:
			self.types = [int(i) for i in head_cells[0]]
			self.default_line = head_cells[1]
			self.table_head = head_cells[2]
			return True
		except ValueError, e:
			return False
	def __getitem__(self, i):
		try:
			return self.lines[ self.index_map[i] ]
		except:
			import traceback
			print '����д���, ����None', self.name, 'ID��',i, 'type',type(i), '����������', self.index_map.has_key(i)
			traceback.print_exc()
			print '-----------END----------------------'
			return None
	def get_num_line(self, line_num):
		line = self.lines[line_num]
		if line.is_bad:
			print 'Get num line, bad line', self.name, line_num
		return self.lines[line_num]
	def __iter__(self):
		for line in self.lines:
			# �������������Ϊ�ǲ����õ�
			if line.is_bad:
				continue
			yield line
	def __len__(self):
		return len( [l for l in self.lines if not l.is_bad] )
	#---------- ��������ӡ��޸ġ���������غ���----------------
	def get_max_id( self ):
		return max(self.index_map.keys())
	def check_index( self, line_data):
		if self.index_id > 0:
			try:
				line_id = int(line_data[self.index_id])
				if line_id < 0:
					raise Exception,''
			except:
				print '����ӵ�����������ȷ, ����Ϊ��', line_data, '����Ϊ', line_data[self.index_id]
				return False, -1
		return True, line_id
	#���һ�У�����Ϊline_data
	def new_empty_line(self, line_id):
		# �Ե�һ�����ݵ�����Ϊ׼������һ��ֻ�����������Ŀհ�list
		new_line = [''] * len(self.lines[1])
		if self.index_id > 0:
			new_line[self.index_id] = str(line_id)
		return new_line
	def add_line(self, line_data):
		flag, index = self.check_index( line_data )
		if not flag:
			return False
		if index <= self.get_max_id():
			print '�����Ѿ����ڣ�add_lineʧ��', index
			return False
		line = mb_line()
		line.set_index_col(self.index_id)
		line.set_line(line_data)
		line.set_father(self)
		self.lines.append(line)
		self.index_map[index] = len(self.lines)-1
		return True
	def get_new_id(self):
		max_id = self.get_max_id()
		new_id = max_id + 1
		return new_id
	def get_raw_line(self, line_id):
		return self.lines(self.index_map[line_id])[:]	#����Ӧ�÷���һ������
	def change_line(self, line_data):
		flag, index = self.check_index( line_data )
		if not flag:
			return False
		if index > self.get_max_id():
			print self.get_max_id()
			print '���в����ڣ�change_lineʧ��', index
			return False
		line = self.lines[self.index_map[index]]
		line.set_line(line_data)
		return True
	def set_line(self, line_data):
		flag, index = self.check_index( line_data )
		if not flag:
			return False
		if self.index_map.has_key( index ):
			return self.change_line(line_data)
		else:
			return self.add_line(line_data)
	def save_to_file(self, file_name = None ):
		if file_name == None:
			file_name = self.name
		s = ''
		if self.table_head != None:
			for cell in self.table_head:
				s += str(cell) + '\t'
			s = s[:-1]
			s += '\n'
		for line in self.lines:
			for cell in line:
				s += str(cell) + '\t'
			s = s[:-1]
			s += '\n'
		f = file(file_name, 'w')
		f.write(s)
		f.close()
	def try_get_line( self, i ):
		if not self.index_map.has_key( i ):
			return None
		return self.lines[ self.index_map[i] ]

def replace_newline( match ):
	s = match.groups()[0]
	return s.replace( '\n', '\\n' )

# Ԥ�����񣬴������š����У�����Excel����TXT�Ĺ���
def preprocess_table(source):
	'''
	# ��������˫����ʵ����һ��˫���ţ����滻�������һ��˫���Ż���
	temp = re.sub(r'""', r'<quot>', source)

	# ����������Ļ��У�����ʵ���С����ҵ��������������������ݣ�Ȼ���滻��r'\n'
	result = re.sub(r'"((?:[^"]|\n)+?)"', replace_newline, temp )
	# ��ԭ����
	result = re.sub(r'<quot>', r'"', result)
	'''
	# ԭ�д���ʽ�����ã������·�ʽ
	temp = re.sub('\x0D\x0A', '\x0D', source )
	return temp


def divide_string_to_cells(source):
	lines = source.split('\x0D')
	cells = []
	for line in lines:
		line = line.rstrip()
		cells.append(line.split('\t'))
	#print cells
	return cells

def read_files_to_string(path):
	source = ''
	head_text = ''			#��ͷҪ��������
	if not os.path.isfile(path):
		return "",""
	src_file = open(path, "rb")
	source = src_file.read()
	src_file.close()

	if source[0] == '\xff' or source[0] == '\xfe':
		source = source.decode('utf-16').encode('utf-8')
	#Ԥ����ɾ����ͷ�����ڶ���ֲ����������ж����ͷ���������������ȽϺ�
	source = preprocess_table(source)
	if not source:
		return '', ''
	#ɾ����һ�б�ͷ
	count = 0
	pos = 0
	for i in range(0, len(source)):
		if source[i] == '\x0D':
			count += 1
			if count == 3:
				pos = i + 1
				break
	if count != 3:
		return '', ''
	head_text = source[:pos]
	source = source[pos:]
	if len(source) == 0:
		return '', head_text
	if source[-1] == '\x0D':
		source = source[:-1] 
	return source, head_text

def create_mb(path, name):
	source,head_text = read_files_to_string(path)
	if source == ''  and head_text != '':
		print '���Ϊ��', path
		return ''
	if source == '' or head_text == '':
		print '��ȡ�ļ�����', path
		return None
	#ɾ����ͷ��Ԥ������read_files_to_string�����Ѿ�����
	head_cells = divide_string_to_cells(head_text)
	cells = divide_string_to_cells(source)
	# index�Ľṹ�ǹ̶���
	table = mb_table()
	table.set_name(name)
	if not table.set_head(head_cells):
		print '��񴴽�ʱset_headʧ��', path
		return None
	if not table.set_data(cells):
		print '��񴴽�ʱset_dataʧ��', path
		return None
	return table


if __name__ == "__main__":
	import ParseTTYDefine
	exec ParseTTYDefine.python_code
	t = create_mb(r'C:\code\cocostty\CocosTTY\Resources\mb\item\item_list.mb', 'item_list')
	print t
	l = t.get_num_line(1)
	print l[item_list_id]
	l = t.get_num_line(0)
	print l[item_list_id]



